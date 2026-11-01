const BRAND = "BADSAL & FILS OKIKIOLA";
const DEFAULT_ORIGIN = "https://badsal-okikiola-fils.be";

const receipts = {
  fr: {
    subject: "Votre demande de devis a bien ete recue",
    greeting: "Bonjour,",
    message: "Nous avons bien recu votre demande de devis. Notre equipe l'examine et vous repondra sous 24 heures ouvrées.",
    closing: "Cordialement,",
  },
  en: {
    subject: "Your quote request has been received",
    greeting: "Hello,",
    message: "We have received your quote request. Our team is reviewing it and will respond within 24 business hours.",
    closing: "Kind regards,",
  },
  zh: {
    subject: "您的报价请求已收到",
    greeting: "您好，",
    message: "我们已收到您的报价请求，团队将在 24 个工作小时内给您答复。",
    closing: "此致，",
  },
  ar: {
    subject: "تم استلام طلب عرض السعر",
    greeting: "مرحبا،",
    message: "تلقينا طلبكم لعرض السعر. سيراجعه فريقنا ويرد عليكم خلال 24 ساعة عمل.",
    closing: "مع خالص التحيات،",
    direction: "rtl",
  },
};

const labels = {
  name: "Nom complet",
  company: "Societe",
  email: "Email",
  product: "Produit souhaite",
  quantity: "Quantite estimee",
  incoterm: "Incoterm souhaite",
  message: "Message",
  locale: "Langue du formulaire",
};

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=UTF-8", ...headers },
});

const acceptedOrigins = (allowedOrigin) => {
  const alternate = allowedOrigin.includes("://www.")
    ? allowedOrigin.replace("://www.", "://")
    : allowedOrigin.replace("://", "://www.");
  return new Set([allowedOrigin, alternate]);
};

const corsHeaders = (origin, allowedOrigin, isAllowedOrigin) => ({
  "access-control-allow-origin": isAllowedOrigin ? origin : allowedOrigin,
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
  vary: "Origin",
});

async function verifyTurnstile(token, request, secret) {
  const body = new URLSearchParams({ secret, response: token });
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) body.set("remoteip", remoteIp);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  return response.ok && (await response.json()).success === true;
}

async function sendBrevo(apiKey, payload) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo error ${response.status}: ${detail.slice(0, 300)}`);
  }
}

function internalEmailHtml(data) {
  const rows = Object.entries(labels).map(([key, label]) => {
    const value = key === "product" && data.product === "__other__" ? data.product_other : data[key];
    return `<tr><td style="padding:8px 12px;border:1px solid #e5e5e0;font-weight:700">${label}</td><td style="padding:8px 12px;border:1px solid #e5e5e0">${escapeHtml(value || "-")}</td></tr>`;
  }).join("");
  return `<div style="font-family:Arial,sans-serif;color:#172630"><h1 style="color:#081f35">Nouvelle demande de devis</h1><table style="border-collapse:collapse">${rows}</table></div>`;
}

function receiptEmailHtml(receipt) {
  const isRtl = receipt.direction === "rtl";
  const direction = isRtl ? "rtl" : "ltr";
  const alignment = isRtl ? "right" : "left";
  const logoMargin = isRtl ? "0 0 28px auto" : "0 0 28px";
  return `<div dir="${direction}" style="margin:0;padding:32px;background:#f5f4f0;font-family:Arial,sans-serif;color:#172630;direction:${direction};text-align:${alignment}"><div style="max-width:600px;margin:0 auto;background:#fbfaf7;border-top:4px solid #b66e26;padding:36px"><img src="https://badsal-okikiola-fils.be/images/logo-neutre.jpg" width="220" alt="${BRAND}" style="display:block;max-width:100%;height:auto;margin:${logoMargin}"><p>${receipt.greeting}</p><p>${receipt.message}</p><p>${receipt.closing}<br><strong>${BRAND}</strong><br>Commerce international · Agro-industrie · Benin</p></div></div>`;
}

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ORIGIN;
    const origin = request.headers.get("Origin") || "";
    const isAllowedOrigin = acceptedOrigins(allowedOrigin).has(origin);
    const cors = corsHeaders(origin, allowedOrigin, isAllowedOrigin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/devis") return json({ success: false, message: "Not found" }, 404, cors);
    if (!isAllowedOrigin) return json({ success: false, message: "Origin not allowed" }, 403, cors);
    if (!env.BREVO_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.NOTIFICATION_EMAIL || !env.BREVO_SENDER) {
      return json({ success: false, message: "Service configuration incomplete" }, 500, cors);
    }

    let data;
    try { data = await request.json(); } catch { return json({ success: false, message: "Invalid request" }, 400, cors); }
    if (!data || typeof data !== "object" || data.botcheck) return json({ success: false, message: "Invalid request" }, 400, cors);

    const clean = (key, max = 2000) => String(data[key] ?? "").trim().slice(0, max);
    const form = {
      name: clean("name", 120), company: clean("company", 160), email: clean("email", 254),
      product: clean("product", 160), product_other: clean("product_other", 160), quantity: clean("quantity", 120),
      incoterm: clean("incoterm", 80), message: clean("message", 4000), locale: clean("locale", 8),
    };
    const token = clean("cf-turnstile-response", 2048);
    if (!form.name || !form.email || !form.product || !form.incoterm || !token || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return json({ success: false, message: "Missing or invalid fields" }, 400, cors);
    }

    if (!await verifyTurnstile(token, request, env.TURNSTILE_SECRET_KEY)) {
      return json({ success: false, message: "Security verification failed" }, 400, cors);
    }

    const sender = { name: BRAND, email: env.BREVO_SENDER };
    const receipt = receipts[form.locale] || receipts.fr;
    try {
      await sendBrevo(env.BREVO_API_KEY, {
        sender, to: [{ email: env.NOTIFICATION_EMAIL }], replyTo: { email: form.email, name: form.name },
        subject: `Nouvelle demande de devis - ${form.name}`, htmlContent: internalEmailHtml(form),
      });
      await sendBrevo(env.BREVO_API_KEY, {
        sender, to: [{ email: form.email, name: form.name }], replyTo: sender,
        subject: receipt.subject, htmlContent: receiptEmailHtml(receipt),
      });
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      return json({ success: false, message: "Email delivery failed" }, 502, cors);
    }

    return json({ success: true }, 200, cors);
  },
};