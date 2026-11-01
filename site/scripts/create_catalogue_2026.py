from pathlib import Path
from io import BytesIO
from datetime import date

from PIL import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"
OUTPUT = ROOT / "output" / "pdf"
OUTPUT.mkdir(parents=True, exist_ok=True)
OUT = OUTPUT / "catalogue-badsal-fils-okikiola-2026-logo-simple.pdf"

# A4 portrait, in points
W, H = 595.28, 841.89
M = 42
NAVY = HexColor("#102B43")
NAVY_2 = HexColor("#173B5A")
COPPER = HexColor("#B97845")
SAND = HexColor("#E8DDCF")
PAPER = HexColor("#F8F7F4")
INK = HexColor("#172B3A")
MUTED = HexColor("#5D6B75")
LINE = HexColor("#D7DEE2")
GREEN = HexColor("#2B5D4C")


def font_path(name):
    return str(Path("C:/Windows/Fonts") / name)


pdfmetrics.registerFont(TTFont("BadsalSerif", font_path("georgia.ttf")))
pdfmetrics.registerFont(TTFont("BadsalSerifBold", font_path("georgiab.ttf")))
pdfmetrics.registerFont(TTFont("BadsalSans", font_path("arial.ttf")))
pdfmetrics.registerFont(TTFont("BadsalSansBold", font_path("arialbd.ttf")))


def wrapped_lines(text, font, size, max_width):
    words = text.replace("\n", " \n ").split()
    lines, line = [], ""
    for word in words:
        if word == "\\n":
            if line:
                lines.append(line)
            line = ""
            continue
        candidate = word if not line else f"{line} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_text(c, text, x, y, width, font="BadsalSans", size=10, leading=14, color=INK, max_lines=None):
    c.setFont(font, size)
    c.setFillColor(color)
    lines = wrapped_lines(text, font, size, width)
    if max_lines is not None:
        if len(lines) > max_lines:
            lines = lines[:max_lines]
            last = lines[-1]
            while stringWidth(last + "...", font, size) > width and len(last) > 2:
                last = last[:-1]
            lines[-1] = last.rstrip() + "..."
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def cover_image(c, filename, x, y, width, height, darken=0):
    path = IMAGES / filename
    with Image.open(path) as original:
        image = original.convert("RGB")
        ratio = max(width / image.width, height / image.height)
        nw, nh = int(image.width * ratio), int(image.height * ratio)
        image = image.resize((nw, nh), Image.Resampling.LANCZOS)
        left = max(0, (nw - int(width)) // 2)
        top = max(0, (nh - int(height)) // 2)
        image = image.crop((left, top, left + int(width), top + int(height)))
        b = BytesIO()
        image.save(b, format="JPEG", quality=90)
    b.seek(0)
    c.drawImage(ImageReader(b), x, y, width=width, height=height, mask="auto")
    if darken:
        c.setFillColor(HexColor("#102B43"))
        c.setFillAlpha(darken)
        c.rect(x, y, width, height, stroke=0, fill=1)
        c.setFillAlpha(1)


def draw_brand_logo(c, filename, x, y, width, height, opacity=1.0):
    """Draw a logo while removing its white raster background."""
    path = IMAGES / filename
    with Image.open(path) as source:
        image = source.convert("RGBA")
        px = image.load()
        for yy in range(image.height):
            for xx in range(image.width):
                r, g, b, _ = px[xx, yy]
                if min(r, g, b) > 242:
                    px[xx, yy] = (r, g, b, 0)
                else:
                    px[xx, yy] = (r, g, b, int(255 * opacity))
        stream = BytesIO()
        image.save(stream, format="PNG")
    stream.seek(0)
    c.drawImage(ImageReader(stream), x, y, width=width, height=height, mask="auto")


def page_base(c, section, number, dark=False):
    bg = NAVY if dark else PAPER
    c.setFillColor(bg)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    if not dark:
        draw_brand_logo(c, "logo-neutre.webp", (W - 320) / 2, (H - 204) / 2, 320, 204, opacity=.045)
    draw_brand_logo(c, "logo-neutre.webp", M, H - 57, 39, 25, opacity=1)
    color = HexColor("#D7E0E5") if dark else MUTED
    c.setStrokeColor(COPPER)
    c.setLineWidth(1.2)
    c.line(M + 50, H - 28, M + 92, H - 28)
    c.setFont("BadsalSansBold", 7.4)
    c.setFillColor(color)
    c.drawString(M + 102, H - 31, section.upper())
    c.drawRightString(W - M, H - 31, f"BADSAL & FILS OKIKIOLA  |  {number:02d}")
    c.setStrokeColor(HexColor("#5C7384") if dark else LINE)
    c.setLineWidth(.5)
    c.line(M, 28, W - M, 28)
    c.setFont("BadsalSans", 7.2)
    c.setFillColor(color)
    c.drawString(M, 15, "Cotonou, Bénin  |  Commerce international et agro-industrie")
    c.drawRightString(W - M, 15, "Catalogue institutionnel 2026")


def section_heading(c, kicker, title, intro=None, dark=False):
    primary = white if dark else NAVY
    secondary = HexColor("#D7E0E5") if dark else MUTED
    y = H - 92
    c.setFillColor(COPPER)
    c.setFont("BadsalSansBold", 8.5)
    c.drawString(M, y, kicker.upper())
    y -= 22
    y = draw_text(c, title, M, y, W - 2 * M, "BadsalSerif", 27, 31, primary)
    c.setFillColor(COPPER)
    c.rect(M, y - 6, 48, 2.5, stroke=0, fill=1)
    if intro:
        y -= 29
        y = draw_text(c, intro, M, y, W - 2 * M - 6, "BadsalSans", 10.5, 15.5, secondary)
    return y


def rounded(c, x, y, w, h, fill=white, stroke=None, radius=8):
    c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
    c.roundRect(x, y, w, h, radius, stroke=1 if stroke else 0, fill=1)


def image_card(c, image, title, body, x, y, w, h, label=None, dark=False):
    rounded(c, x, y, w, h, fill=HexColor("#FDFDFC") if not dark else NAVY_2, stroke=LINE if not dark else None, radius=8)
    img_h = h * .46
    cover_image(c, image, x, y + h - img_h, w, img_h)
    tx = x + 15
    top = y + h - img_h - 17
    if label:
        c.setFillColor(COPPER)
        c.setFont("BadsalSansBold", 7.4)
        c.drawString(tx, top, label.upper())
        top -= 16
    c.setFillColor(NAVY if not dark else white)
    c.setFont("BadsalSerifBold", 13.2)
    for line in wrapped_lines(title, "BadsalSerifBold", 13.2, w - 30)[:2]:
        c.drawString(tx, top, line)
        top -= 15
    top -= 3
    draw_text(c, body, tx, top, w - 30, "BadsalSans", 8.3, 11.5, MUTED if not dark else HexColor("#D4DEE5"), max_lines=4)


def mini_product(c, image, title, note, x, y, w, h, index):
    rounded(c, x, y, w, h, white, LINE, radius=7)
    cover_image(c, image, x, y + h - 82, w, 82)
    c.setFillColor(COPPER)
    c.setFont("BadsalSansBold", 7.2)
    c.drawString(x + 12, y + h - 96, f"{index:02d}")
    draw_text(c, title, x + 12, y + h - 112, w - 24, "BadsalSerifBold", 11.3, 13.2, NAVY, max_lines=2)
    draw_text(c, note, x + 12, y + 16, w - 24, "BadsalSans", 7.6, 9.5, MUTED, max_lines=3)


def quote_box(c, x, y, w, h, text, author=None):
    rounded(c, x, y, w, h, SAND, None, radius=8)
    c.setFont("BadsalSerif", 16)
    c.setFillColor(NAVY)
    c.drawString(x + 22, y + h - 30, "“")
    draw_text(c, text, x + 22, y + h - 53, w - 44, "BadsalSerif", 13.4, 18, NAVY, max_lines=5)
    if author:
        c.setFont("BadsalSansBold", 7.6)
        c.setFillColor(COPPER)
        c.drawString(x + 22, y + 18, author.upper())


def cover(c):
    cover_image(c, "hero-logistics-v2.webp", 0, 0, W, H, darken=.43)
    c.setFillColor(NAVY)
    c.setFillAlpha(.84)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillAlpha(1)
    c.setFillColor(COPPER)
    c.rect(M, H - 76, 62, 2.5, stroke=0, fill=1)
    draw_brand_logo(c, "logo-neutre.webp", W - M - 138, H - 142, 138, 88, opacity=1)
    c.setFont("BadsalSansBold", 8.5)
    c.setFillColor(HexColor("#E7D9C6"))
    c.drawString(M, H - 97, "CATALOGUE INSTITUTIONNEL 2026")
    c.setFillColor(white)
    c.setFont("BadsalSerifBold", 35)
    c.drawString(M, H - 170, "BADSAL & FILS")
    c.drawString(M, H - 212, "OKIKIOLA")
    c.setFillColor(COPPER)
    c.rect(M, H - 238, 72, 2.5, stroke=0, fill=1)
    draw_text(c, "Commerce international, agro-industrie et approvisionnement professionnel depuis le Bénin.", M, H - 282, 370, "BadsalSans", 13, 19, HexColor("#EDF1F2"), max_lines=3)
    c.setStrokeColor(HexColor("#587386"))
    c.setLineWidth(.7)
    c.line(M, 130, W - M, 130)
    c.setFont("BadsalSansBold", 8)
    c.setFillColor(COPPER)
    c.drawString(M, 108, "EXPORTATION  |  IMPORTATION  |  INDUSTRIALISATION")
    c.setFont("BadsalSans", 9.2)
    c.setFillColor(white)
    c.drawString(M, 80, "Cotonou, Akpakpa PK 5, Dandji Lot N°772 - Bénin")
    c.drawRightString(W - M, 80, "www.badsal-okikiola-fils.be")
    c.showPage()


def identity(c, number):
    page_base(c, "Présentation", number)
    y = section_heading(c, "Notre identité", "Une référence béninoise, du continent aux marchés mondiaux", "BADSAL & FILS OKIKIOLA Sarl accompagne les professionnels dans le commerce international, la valorisation agricole et l'approvisionnement en matériaux essentiels.")
    cover_image(c, "institutional-team-v2.webp", M, 318, W - 2 * M, 195)
    quote_box(c, M, 185, W - 2 * M, 106, "Notre rôle est de relier des filières rigoureusement sélectionnées aux exigences concrètes des marchés internationaux.", "BADSAL & FILS OKIKIOLA")
    c.setFillColor(NAVY)
    c.setFont("BadsalSansBold", 8)
    c.drawString(M, 145, "NOS VALEURS")
    values = [("Excellence", "Des solutions adaptées à chaque besoin."), ("Rigueur", "Un suivi précis de chaque opération."), ("Intégrité", "Une relation durable avec nos partenaires.")]
    col = (W - 2*M - 26) / 3
    for i, (title, desc) in enumerate(values):
        x = M + i*(col+13)
        c.setFillColor(COPPER); c.circle(x + 5, 115, 4, stroke=0, fill=1)
        c.setFillColor(NAVY); c.setFont("BadsalSerifBold", 12); c.drawString(x + 16, 109, title)
        draw_text(c, desc, x, 92, col, "BadsalSans", 8.2, 10.5, MUTED, max_lines=2)
    c.showPage()


def model(c, number):
    page_base(c, "Notre modèle", number, dark=True)
    y = section_heading(c, "Deux expertises complémentaires", "Du sourcing à la destination : une chaîne maîtrisée", "Notre activité associe l'exportation de produits béninois à forte valeur et l'importation ciblée de matériaux pour les professionnels.", dark=True)
    y -= 30
    cards = [
        ("01 / EXPORTATION", "Agro-industrie & exportation", "Produits tropicaux, oléagineux, fruits, dérivés et ressources minières sélectionnés pour les marchés internationaux.", "export-agro-v1.webp"),
        ("02 / IMPORTATION", "Matériaux essentiels", "Fer à béton, cuivre, fils électriques, plâtres et tuyaux pour les projets de construction et de distribution.", "import-operations-v2.webp"),
    ]
    card_w = (W - 2*M - 18)/2
    for i, (lab, title, desc, image) in enumerate(cards):
        x = M + i*(card_w+18)
        image_card(c, image, title, desc, x, 278, card_w, 250, label=lab, dark=True)
    c.setFillColor(HexColor("#D7E0E5"))
    c.setFont("BadsalSans", 10.2)
    draw_text(c, "Une même exigence : comprendre le besoin, qualifier l'offre, sécuriser la logistique et construire une relation commerciale durable.", M, 208, W - 2*M, "BadsalSans", 10.2, 15, HexColor("#D7E0E5"), max_lines=3)
    c.showPage()


def export_intro(c, number):
    page_base(c, "Exportation", number)
    section_heading(c, "01 / Exportation", "Des filières béninoises prêtes pour le monde", "Nous sourçons, contrôlons et conditionnons des produits agroalimentaires et des matières premières pour des partenaires en Afrique, en Europe, en Asie et au Moyen-Orient.")
    cover_image(c, "export-agro-v1.webp", M, 310, W - 2*M, 210)
    bullets = [
        ("Sélection", "Des filières et partenaires rigoureusement choisis."),
        ("Traçabilité", "Un suivi structuré du sourcing au conteneur."),
        ("Logistique", "Solutions aériennes ou maritimes selon le besoin."),
        ("Incoterms", "Ventes principalement en CIF et FOB."),
    ]
    c.setFillColor(NAVY); c.setFont("BadsalSansBold", 8); c.drawString(M, 270, "NOTRE APPROCHE EXPORT")
    for i,(title, desc) in enumerate(bullets):
        x = M + (i % 2) * 260; y = 230 - (i // 2) * 65
        c.setFillColor(COPPER); c.rect(x, y+10, 5, 5, stroke=0, fill=1)
        c.setFillColor(NAVY); c.setFont("BadsalSansBold", 10); c.drawString(x+14, y+10, title)
        draw_text(c, desc, x+14, y-5, 220, "BadsalSans", 8.4, 11, MUTED, max_lines=2)
    c.showPage()


def flagship(c, number):
    page_base(c, "Exportation", number)
    section_heading(c, "Produits phares", "Des références emblématiques de nos filières", "Une sélection de produits agricoles et transformés qui porte le savoir-faire béninois sur les marchés internationaux.")
    items = [
        ("export-ananas-v2.webp", "Ananas & dérivés", "Ananas frais, jus et fruits séchés calibrés et conditionnés pour l'export."),
        ("export-karite-v2.webp", "Karité & dérivés", "Beurre brut ou raffiné, avec une traçabilité complète depuis les coopératives."),
        ("export-manioc-v2.webp", "Manioc & dérivés", "Gari, tapioca, farine et amidon destinés aux marchés professionnels."),
        ("export-noix-palme-v2.webp", "Noix de palme & dérivés", "Huile de palme et dérivés issus d'une filière responsable et contrôlée."),
    ]
    w = (W - 2*M - 16)/2
    for i, item in enumerate(items):
        x = M + (i % 2)*(w+16); y = 332 - (i//2)*245
        image_card(c, *item, x, y, w, 222, label=f"RÉFÉRENCE {i+1:02d}")
    c.showPage()


def product_grid_page(c, number, title, intro, items, section="Exportation"):
    page_base(c, section, number)
    section_heading(c, "Nos produits", title, intro)
    cols, gap = 3, 12
    w = (W - 2*M - gap*2)/3
    h = 237
    for i, item in enumerate(items):
        x = M + (i%cols)*(w+gap)
        y = 308 - (i//cols)*(h+18)
        mini_product(c, *item, x, y, w, h, i+1)
    c.showPage()


def derivatives(c, number):
    page_base(c, "Exportation", number)
    section_heading(c, "Produits dérivés", "Des ingrédients à valeur ajoutée", "Une sélection de poudres, huiles et beurres pensée pour les industriels, distributeurs et formulateurs.")
    items = [
        ("export-poudre-henne-v2.webp", "Poudre de henné", "Ingrédient végétal sélectionné."),
        ("export-poudre-moringa-v2.webp", "Poudre de moringa", "Produit végétal à destination professionnelle."),
        ("export-poudre-cacao-v2.webp", "Poudre de cacao alcalinisée", "Ingrédient pour les filières de transformation."),
        ("export-huile-moringa-v2.webp", "Huile de moringa", "Huile végétale destinée aux usages professionnels."),
        ("export-huile-avocat-v2.webp", "Huile d'avocat", "Huile végétale pour les marchés spécialisés."),
        ("export-huile-soja-v2.webp", "Huile de soja", "Disponible pour les besoins industriels et alimentaires."),
        ("export-beurre-cacao-v2.webp", "Beurre de cacao alimentaire", "Matière grasse adaptée aux applications alimentaires."),
    ]
    cols, gap = 3, 12
    w = (W - 2*M - gap*2)/3
    h = 170
    for i, item in enumerate(items):
        x = M + (i%cols)*(w+gap)
        y = 370 - (i//cols)*(h+13)
        mini_product(c, *item, x, y, w, h, i+1)
    c.showPage()


def imports(c, number):
    page_base(c, "Importation", number, dark=True)
    section_heading(c, "02 / Importation", "Des matériaux fiables pour les besoins professionnels", "Une offre volontairement concentrée sur cinq références essentielles aux chantiers, réseaux et projets de distribution au Bénin et en Afrique de l'Ouest.", dark=True)
    items = [
        ("import-rebar-v1.webp", "Fer à béton", "Solutions pour les besoins de structure et de chantier."),
        ("import-copper-v1.webp", "Cuivre", "Matière première destinée aux besoins professionnels."),
        ("import-electrical-wire-v1.webp", "Fils électriques", "Fils et câbles pour l'installation et la distribution."),
        ("import-plaster-v1.webp", "Plâtres", "Solutions de finition et d'aménagement intérieur."),
        ("import-pipes-v1.webp", "Tuyaux", "Pour les installations et réseaux de distribution."),
    ]
    cols, gap = 3, 12
    w = (W - 2*M - gap*2)/3
    h = 220
    for i, item in enumerate(items):
        x = M + (i%cols)*(w+gap)
        y = 322 - (i//cols)*(h+16)
        mini_product(c, *item, x, y, w, h, i+1)
    c.setFillColor(HexColor("#D7E0E5")); c.setFont("BadsalSans", 9)
    draw_text(c, "Chaque demande est étudiée selon les spécifications, les volumes, les délais et la destination souhaités.", M, 82, W - 2*M, "BadsalSans", 9, 13, HexColor("#D7E0E5"), max_lines=2)
    c.showPage()


def commitment(c, number):
    page_base(c, "Engagements", number)
    section_heading(c, "Confiance & exécution", "Un partenaire conçu pour les exigences du commerce international", "Notre promesse repose sur une démarche de qualité, de conformité et de coordination adaptée aux opérations professionnelles.")
    cards = [
        ("Sélection & conformité", "Chaque lot fait l'objet d'un contrôle qualité et d'une attention aux exigences du pays de destination."),
        ("Traçabilité & durabilité", "Nous travaillons avec des partenaires et coopératives sélectionnés au Bénin, dans l'UEMOA et la CEDEAO."),
        ("Fiabilité logistique", "Maîtrise des circuits aériens et maritimes, suivi des Incoterms et coordination des délais."),
    ]
    for i,(title, body) in enumerate(cards):
        y = 430 - i*112
        rounded(c, M, y, W - 2*M, 91, white, LINE, 8)
        c.setFillColor(COPPER); c.setFont("BadsalSerifBold", 24); c.drawString(M+19, y+42, f"0{i+1}")
        c.setFillColor(NAVY); c.setFont("BadsalSerifBold", 14); c.drawString(M+67, y+57, title)
        draw_text(c, body, M+67, y+39, W - 2*M - 92, "BadsalSans", 8.7, 12.2, MUTED, max_lines=3)
    quote_box(c, M, 78, W-2*M, 112, "Du besoin exprimé jusqu'au port de destination, nous cherchons une exécution claire, documentée et durable.")
    c.showPage()


def vision(c, number):
    page_base(c, "Vision", number, dark=True)
    section_heading(c, "Vision & industrialisation", "Créer plus de valeur, ici, pour le monde", "Au-delà du négoce, BADSAL & FILS OKIKIOLA s'inscrit dans une ambition de transformation locale et de développement de filières industrielles béninoises.", dark=True)
    projects = [
        ("01", "Acajou", "Amandes transformées"),
        ("02", "Oléagineux", "Huiles & tourteaux"),
        ("03", "Ananas", "Jus & fruits séchés"),
        ("04", "Manioc", "Amidon industriel"),
    ]
    w = (W - 2*M - 14)/2
    for i,(num, raw, product) in enumerate(projects):
        x = M + (i%2)*(w+14); y = 316 - (i//2)*133
        rounded(c, x, y, w, 112, NAVY_2, None, 8)
        c.setFillColor(COPPER); c.setFont("BadsalSansBold", 8); c.drawString(x+16, y+85, f"PROJET {num}")
        c.setFillColor(white); c.setFont("BadsalSerifBold", 15); c.drawString(x+16, y+60, raw)
        c.setFillColor(HexColor("#D7E0E5")); c.setFont("BadsalSans", 9.2); c.drawString(x+16, y+37, product)
    c.setFillColor(HexColor("#D7E0E5")); c.setFont("BadsalSans", 10)
    draw_text(c, "Nous invitons investisseurs, industriels et partenaires techniques à construire avec nous la chaîne de valeur agricole de demain.", M, 106, W - 2*M, "BadsalSans", 10, 15, HexColor("#D7E0E5"), max_lines=3)
    c.showPage()


def contact(c, number):
    page_base(c, "Contact", number)
    section_heading(c, "Parlons de votre projet", "Recevez une offre personnalisée", "Partagez le produit souhaité, le volume estimé, le port de destination et l'Incoterm envisagé. Notre équipe vous répond sous 24 h ouvrées.")
    rounded(c, M, 320, W - 2*M, 174, NAVY, None, 9)
    c.setFillColor(COPPER); c.setFont("BadsalSansBold", 8.5); c.drawString(M+24, 462, "BADSAL & FILS OKIKIOLA SARL")
    c.setFillColor(white); c.setFont("BadsalSerifBold", 19); c.drawString(M+24, 424, "Cotonou, Bénin")
    c.setFillColor(HexColor("#D7E0E5")); c.setFont("BadsalSans", 10)
    c.drawString(M+24, 392, "Akpakpa PK 5, Dandji Lot N°772")
    c.drawString(M+24, 370, "info@badsal-okikiola-fils.be")
    c.drawString(M+24, 348, "+229 0199034344  |  0197886596  |  0148474788")
    c.setFillColor(COPPER); c.setFont("BadsalSansBold", 8.4); c.drawString(M+24, 330, "RCCM N°RB/PNO/18 B 2200  |  IFU 320080103218")
    qr = ROOT / "public" / "wechat-qr.jpeg"
    c.drawImage(str(qr), W-M-126, 338, width=100, height=100, mask="auto")
    c.setFillColor(HexColor("#D7E0E5")); c.setFont("BadsalSans", 7.5); c.drawCentredString(W-M-76, 324, "WeChat")
    c.setFillColor(NAVY); c.setFont("BadsalSansBold", 9); c.drawString(M, 273, "POUR PRÉPARER VOTRE DEMANDE DE DEVIS")
    asks = ["Produit ou référence souhaitée", "Quantité estimée et rythme d'approvisionnement", "Port ou destination", "Incoterm souhaité : CIF, FOB, EXW ou autre"]
    for i, ask in enumerate(asks):
        y = 240 - i*34
        c.setFillColor(COPPER); c.circle(M+5, y+3, 3, stroke=0, fill=1)
        c.setFillColor(INK); c.setFont("BadsalSans", 10); c.drawString(M+18, y, ask)
    c.setFillColor(NAVY); c.setFont("BadsalSerifBold", 15)
    c.drawString(M, 82, "Construisons votre prochaine opération.")
    c.showPage()


def main():
    c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
    c.setTitle("Catalogue institutionnel 2026 - Badsal & Fils Okikiola")
    c.setAuthor("Badsal & Fils Okikiola")
    c.setSubject("Commerce international, agro-industrie, exportation et importation")
    cover(c)
    identity(c, 2)
    model(c, 3)
    export_intro(c, 4)
    flagship(c, 5)
    product_grid_page(c, 6, "Agroalimentaire & tropical", "Des produits sélectionnés, conditionnés et proposés selon les besoins des marchés de destination.", [
        ("export-anacarde-v2.webp", "Anacarde (cajou)", "Noix brutes et amandes calibrées, triées et certifiées."),
        ("export-soja-v2.webp", "Soja & dérivés", "Graines, tourteaux et huile destinés aux marchés internationaux."),
        ("export-mangue-avocat-v2.webp", "Mangue & avocat frais", "Fruits frais sélectionnés pour l'exportation."),
        ("export-sesame-v2.webp", "Sésame", "Graines rigoureusement triées pour les filières de transformation."),
        ("export-arachide-v2.webp", "Arachide", "Arachides sélectionnées pour l'export et les usages industriels."),
        ("export-miel-v2.webp", "Miel", "Miel issu de filières locales sélectionnées."),
    ])
    product_grid_page(c, 7, "Filières spécialisées", "Des produits à destination des acheteurs, transformateurs et distributeurs internationaux.", [
        ("export-fruits-seches-v2.webp", "Fruits séchés", "Ananas et autres fruits transformés pour les marchés spécialisés."),
        ("export-aliments-betail-v2.webp", "Aliments de bétail", "Tourteaux de soja, tourteaux de coton, pellets et Ud-Cake."),
        ("export-ressources-minieres-v2.webp", "Ressources minières", "Or et pierres précieuses : opérations encadrées et documentées."),
    ])
    derivatives(c, 8)
    imports(c, 9)
    commitment(c, 10)
    vision(c, 11)
    contact(c, 12)
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
