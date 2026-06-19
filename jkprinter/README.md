# JSK Printer — marketing site

**JSK Printer** (rebranded from JK) — clean product-style UI: light **slate** surfaces, **violet + orange** accents, **Outfit** display + **Inter** body, glassy header, rounded cards, soft **Aura** background (no heavy black rules or industrial ticket theme).

Stack: **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **React Router**.

> Folder may still be named `jkprinter` if Windows locked it during rename — `package.json` name is **`jsk-printer`**. Close editors/servers and rename the folder to `jsk-printer` if you want paths to match.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Customize

- **Meta & fonts:** `index.html`
- **Tokens:** `src/index.css`
- **Copy & gallery URLs:** `src/data/site.ts`
- **Contact:** `src/pages/Contact.tsx` — wire to your API or form service (demo submit only)
