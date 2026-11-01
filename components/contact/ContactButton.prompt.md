**ContactButton** — a messaging CTA in the platform's own brand color (WhatsApp green `#25D366`, WeChat green `#07C160`), for fast B2B enquiries.

```jsx
<ContactButton channel="whatsapp" href="https://wa.me/22900000000" />
<ContactButton channel="wechat" label="Nous contacter sur WeChat" />
```

Use `channel` to pick the platform (sets color + icon). `href` renders an anchor opening in a new tab. Place these near the primary quote CTA, never replacing it.
