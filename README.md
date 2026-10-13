# Mindloop Landing Page

A responsive, monochrome landing page built with React, Vite, TypeScript, Tailwind CSS, shadcn-style UI primitives, Framer Motion, and hls.js.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Notes

- Background films are loaded from the supplied remote MP4/HLS URLs.
- `hls.js` is used for the CTA HLS background video, with native HLS fallback for browsers such as Safari.
- The subscription form currently provides client-side confirmation only. Connect it to your newsletter provider/API before collecting subscribers in production.
- The local SVG assets in `public/assets` are monochrome placeholders for the requested avatars and platform marks. Replace them with approved brand assets or photography if available.
- The `--accent` token is retained as specified in the design system but is not used in the monochrome interface.


## Deploy to GitHub Pages

1. Create a GitHub repository and upload the contents of this project (the `package.json` file must be in the repository root).
2. Push the code to the `main` or `master` branch. The workflow in `.github/workflows/deploy.yml` will install dependencies, build the site, and publish `dist` to GitHub Pages.
3. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for the `Deploy Mindloop to GitHub Pages` workflow to finish. The public URL will appear in the deployment job.

The Vite base path is configured automatically for a standard project repository such as `https://username.github.io/repository-name/`. For a user/org site repository named `username.github.io`, the base path is `/`.

Note: GitHub Pages hosts the built static site; it does not run `npm run dev` as a permanent server. The subscription form is still demo-only and needs a newsletter provider/API before collecting real subscribers.
