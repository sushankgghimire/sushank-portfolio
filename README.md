# sushankghimire.com.np

Personal site of Sushank Ghimire, AI engineer in Kathmandu, Nepal. Built with Astro 7 as a fully static site and deployed to GitHub Pages through GitHub Actions.

## Stack

- Astro 7 (static output, content collections, built-in Fonts API)
- MDX blog with Expressive Code for syntax highlighting
- GSAP for scroll choreography, OGL for the WebGL hero, both loaded after idle
- satori + resvg for build-time Open Graph images
- JSON-LD (Person, WebSite, ProfilePage, BlogPosting, SoftwareSourceCode, ScholarlyArticle)

## Run it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + static build into dist/
npm run preview
```

Node 22 or newer is required (see `.nvmrc`).

## Where things live

- `src/data/profile.ts` is the single source of truth for name, roles, experience, skills, research and case studies. The hero, timeline, footer and every JSON-LD block read from it.
- `src/content/blog/*.mdx` are posts. Frontmatter: `title`, `description`, `pubDate`, `tags`, optional `updatedDate`, `draft`.
- `src/content/projects/*.md` are project pages. `category` is `ai` or `web`; `featured` controls the home page grid.
- `public/assets/pdf/` keeps the original research PDFs at their historical URLs. Do not rename them.
- `public/cv/Sushank-Ghimire-CV.pdf` is the current CV.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. `public/CNAME` keeps the custom domain attached.

One-time settings that live outside this repo:

1. GitHub: Settings > Pages > Build and deployment > Source must be **GitHub Actions**.
2. Cloudflare (the domain is proxied): SSL/TLS mode **Full**, and **Always Use HTTPS** turned on.
3. Google Search Console: add the domain property and submit `https://sushankghimire.com.np/sitemap-index.xml`.
