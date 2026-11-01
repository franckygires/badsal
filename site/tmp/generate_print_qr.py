from __future__ import annotations

import base64
import sys
from io import BytesIO
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tmp" / "python-qrcode"))
import qrcode

URL = "https://badsal-okikiola-fils.be/"
NAVY = "#081F35"
IVORY = "#FBFAF7"
COPPER = "#B66E26"
ARTWORK_MM = 40
OUTER_QUIET_MM = 2


def hex_color(value: str) -> Color:
    value = value.lstrip("#")
    return Color(int(value[:2], 16) / 255, int(value[2:4], 16) / 255, int(value[4:], 16) / 255)


def qr_matrix() -> list[list[bool]]:
    code = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=1,
        border=4,
    )
    code.add_data(URL)
    code.make(fit=True)
    return code.get_matrix()


def logo_png() -> bytes:
    source = Image.open(ROOT / "public" / "images" / "logo-neutre.jpg").convert("RGBA")
    source.thumbnail((248, 248), Image.Resampling.LANCZOS)
    pixels = source.load()
    for y in range(source.height):
        for x in range(source.width):
            red, green, blue, alpha = pixels[x, y]
            if red > 242 and green > 242 and blue > 242:
                pixels[x, y] = (red, green, blue, 0)
    surface = Image.new("RGBA", (300, 300), (0, 0, 0, 0))
    surface.paste(source, ((300 - source.width) // 2, (300 - source.height) // 2), source)
    stream = BytesIO()
    surface.save(stream, "PNG", optimize=True)
    return stream.getvalue()


def svg_path(matrix: list[list[bool]], module: float, offset: float) -> str:
    commands: list[str] = []
    for row, cells in enumerate(matrix):
        for column, enabled in enumerate(cells):
            if enabled:
                x = offset + column * module
                y = offset + row * module
                commands.append(f"M{x:.4f},{y:.4f}h{module:.4f}v{module:.4f}h-{module:.4f}z")
    return "".join(commands)


def main() -> None:
    output_pdf = ROOT / "output" / "pdf"
    output_print = ROOT / "output" / "print"
    output_pdf.mkdir(parents=True, exist_ok=True)
    output_print.mkdir(parents=True, exist_ok=True)

    matrix = qr_matrix()
    artwork = ARTWORK_MM * mm
    quiet = OUTER_QUIET_MM * mm
    qr_size = artwork - (quiet * 2)
    module = qr_size / len(matrix)
    logo = logo_png()
    encoded_logo = base64.b64encode(logo).decode("ascii")

    # The central mark stays below 12% of the code width; level H protects the code.
    logo_size = 3.2 * mm
    badge_radius = (logo_size / 2) + (0.5 * mm)
    center = artwork / 2

    pdf_path = output_pdf / "badsal-website-qr-print-v3.pdf"
    pdf = canvas.Canvas(str(pdf_path), pagesize=(artwork, artwork), pageCompression=1)
    pdf.setTitle("BADSAL & FILS OKIKIOLA - QR code site web")
    pdf.setAuthor("BADSAL & FILS OKIKIOLA")
    pdf.setFillColor(hex_color(IVORY))
    pdf.rect(0, 0, artwork, artwork, stroke=0, fill=1)
    pdf.setFillColor(hex_color(NAVY))
    for row, cells in enumerate(matrix):
        for column, enabled in enumerate(cells):
            if enabled:
                x = quiet + column * module
                y = quiet + (len(matrix) - row - 1) * module
                pdf.rect(x, y, module, module, stroke=0, fill=1)
    pdf.setFillColor(hex_color(IVORY))
    pdf.setStrokeColor(hex_color(COPPER))
    pdf.setLineWidth(0.5 * mm)
    pdf.circle(center, center, badge_radius, stroke=1, fill=1)
    pdf.drawImage(ImageReader(BytesIO(logo)), center - logo_size / 2, center - logo_size / 2, logo_size, logo_size, mask="auto")
    pdf.showPage()
    pdf.save()

    svg_path_output = output_print / "badsal-website-qr-print-v3.svg"
    path = svg_path(matrix, module, quiet)
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{ARTWORK_MM}mm" height="{ARTWORK_MM}mm" viewBox="0 0 {artwork:.4f} {artwork:.4f}" role="img" aria-label="QR code BADSAL &amp; FILS OKIKIOLA">
  <title>QR code - BADSAL &amp; FILS OKIKIOLA</title>
  <desc>Scannez pour ouvrir {URL}</desc>
  <rect width="{artwork:.4f}" height="{artwork:.4f}" fill="{IVORY}"/>
  <path d="{path}" fill="{NAVY}"/>
  <circle cx="{center:.4f}" cy="{center:.4f}" r="{badge_radius:.4f}" fill="{IVORY}" stroke="{COPPER}" stroke-width="{0.5 * mm:.4f}"/>
  <image x="{center - logo_size / 2:.4f}" y="{center - logo_size / 2:.4f}" width="{logo_size:.4f}" height="{logo_size:.4f}" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,{encoded_logo}"/>
</svg>
'''
    svg_path_output.write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    main()