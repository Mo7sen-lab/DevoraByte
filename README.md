# DevoraByte website

A responsive, one-page portfolio and web-development studio website built with plain HTML, CSS, and JavaScript.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in your browser, or use the **Live Server** extension in VS Code.
3. Google Fonts needs an internet connection; the rest of the site is dependency-free.

## Before publishing — important
1. Open `script.js` and replace `CONTACT_EMAIL` with the real inbox you want to receive inquiries at.
2. In `script.js`, replace the placeholder URLs in `SOCIAL_PROFILES` with your real Instagram, LinkedIn, GitHub, and WhatsApp profile/contact links. For WhatsApp, use the international phone number format without `+`, spaces, or dashes.
3. The contact form uses `mailto:` to prepare a message in the visitor's email app. It does **not** send messages directly or store them on a server. For a true online form, connect a form provider or add a backend/API and configure it before publishing.
4. The portfolio projects (Hotel Oasis, Forme Goods, Pulse Landing) are clearly marked as concept designs. Replace them with real work and working demo/source links when available.
5. Review the package descriptions so they match the services you actually offer. No prices are invented; visitors are asked to request a quote.
6. Add a canonical URL and a real domain-specific social preview image once your domain is final.

## Included
- Responsive dark navy / blue / purple design
- Mobile navigation menu and accessible theme toggle (dark/light, saved on device)
- Services, package cards, portfolio filters, about, process, and contact sections
- Package buttons that preselect a service in the contact form
- Contact form validation and email-draft behavior
- SEO description, Open Graph metadata, theme color, and inline favicon
- Social profile placeholders that point visitors to the contact section until configured
- Reduced-motion accessibility support

## Deployment
You can deploy this static site to Netlify or GitHub Pages. A backend is not included in this package; do not describe the contact form as a direct server submission until one is connected.
