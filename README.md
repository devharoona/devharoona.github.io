# Haroon Rasool Portfolio

A production-oriented personal portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber. The site presents Haroon Rasool as a Full-Stack Developer through an interactive hero, verified project showcase, technical profile, services, education timeline, and contact workflow.

## Features

- Responsive App Router portfolio for mobile, tablet, laptop, and desktop.
- Interactive 3D hero canvas with a mouse-responsive portrait orb, glowing rings, particles, and a local portrait asset.
- Lazy-loaded 3D canvas so the initial page can render without blocking on the hero experience.
- Framer Motion entrance animations, project card tilt, magnetic buttons, modal project details, and animated technology chips.
- Custom translucent cursor for fine-pointer devices with reduced-motion and touch fallbacks.
- Centralized personal, skills, projects, services, and experience data in `src/lib/data.ts`.
- Project cards linked to verified GitHub repositories and available live demos.
- Accessible skip link, semantic sections, keyboard focus styles, descriptive image text, and responsive navigation.
- Contact form with server-side validation and optional Resend email delivery.
- SEO metadata, Open Graph metadata, Twitter card metadata, favicon, and responsive image handling.

## Technology

- Next.js `14.2.5` with App Router
- React `18`
- TypeScript
- Tailwind CSS `3`
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- Lucide React
- Resend HTTP API for contact delivery

## Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── pichr.png                 # Hero portrait used by the 3D canvas
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts  # Server-side contact endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx            # Metadata and root layout
│   │   └── page.tsx              # Page composition
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ContactCanvas.tsx
│   │   │   └── HeroCanvas.tsx
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Services.tsx
│   │   └── ui/
│   │       ├── CustomCursor.tsx
│   │       ├── MagneticButton.tsx
│   │       ├── SectionHeading.tsx
│   │       └── SectionWrapper.tsx
│   └── lib/
│       └── data.ts               # Central content configuration
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Requirements

- Node.js 18.17 or newer
- npm

## Installation

```bash
cd portfolio
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The first compile can take longer because the 3D dependencies are bundled lazily. If Next.js reports a missing generated chunk such as `./948.js`, stop all development servers, remove `.next`, and start one server again:

```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3002 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm run dev
```

Do not run `next dev` and `next build` against the same `.next` directory at the same time.

## Production

Build and run the production server:

```bash
npm run build
npm run start
```

For a static hosting workflow, use a Next.js-compatible deployment target. The configured metadata currently uses `https://devharoona.github.io` as the canonical site base.

## Contact Configuration

The contact form posts to `/api/contact`. Email delivery is server-side and uses the Resend REST API. No API key is exposed to client code.

Create environment variables for local development or deployment:

```env
RESEND_API_KEY=re_your_server_key
CONTACT_FROM_EMAIL=Portfolio <your-verified-sender@example.com>
CONTACT_TO_EMAIL=haroonrasool2@gmail.com
```

`CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` have safe defaults in the route, but production deployments should provide explicit values and use a sender domain verified with Resend.

Without `RESEND_API_KEY`, the endpoint intentionally returns a configuration error instead of pretending that a message was sent.

## Content Updates

Edit `src/lib/data.ts` to update:

- `PERSONAL` for identity, links, location, email, and résumé path.
- `SKILLS` for technology chips and colors.
- `PROJECTS` for project title, category, description, stack, image, GitHub URL, and live URL.
- `SERVICES` for capability cards.
- `EXPERIENCE` for verified education, certifications, or employment history.

Project images use Next.js Image and therefore require their remote host to be listed in `next.config.js` under `images.remotePatterns`.

## Hero Portrait

The 3D hero currently loads:

```text
public/pichr.png
```

The image is displayed inside a circular HTML overlay rendered through Drei's `Html` helper, with animated cyan and violet rings around it. Replace `pichr.png` to change the portrait without changing the canvas component.

## Accessibility and Performance

- The custom cursor is disabled on touch devices and when reduced motion is requested.
- The 3D hero is dynamically imported and rendered at a low-power configuration.
- Buttons and links retain native keyboard behavior and visible focus styles.
- The page includes a skip-to-content link and semantic section landmarks.
- `next/image` is used for project previews.
- Animations are decorative and should not be required to understand or use the site.

## Validation

Run the production validation command before deployment:

```bash
npm run build
```

The build performs TypeScript checking, linting through Next.js, page data collection, and static page generation.

The package also exposes:

```bash
npm run lint
```

## Known Development Notes

- The `/.well-known/appspecific/com.chrome.devtools.json` `404` often comes from browser tooling and is unrelated to the portfolio.
- If generated chunk errors appear after editing while the dev server is running, restart the server after removing `.next` as described above.
- The contact endpoint requires a configured Resend key to deliver email; local builds do not require that key.
