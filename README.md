# Yang Zhenzhao – Personal Portfolio

Modern single-page portfolio built with Next.js to showcase AI and software projects. The site highlights professional experience, projects, skills, and contact information with a premium visual style.

## Features
- Responsive layout optimized for desktop, tablet, and mobile
- Animated hero, project cards, and timelines powered by Framer Motion
- Keyboard shortcuts and scroll progress indicator for fast navigation
- Optional reduced-motion experience for accessibility
- Contact section with direct links to social profiles and email

## Tech Stack
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lenis for smooth scrolling
- Lucide React icon set

## Getting Started
```bash
# install dependencies
npm install

# start development server
npm run dev

# build production bundle
npm run build

# serve the production build locally
npm start
```

Visit the app at http://localhost:3000 once the development server is running.

## Project Structure
```
app/                # Next.js app router pages and layout
components/         # Reusable UI components
hooks/              # Custom React hooks
public/             # Static assets
styles/             # Global styles and Tailwind config
```

## Customization Tips
- Update content in `components/sections` to change hero, projects, education, and contact details.
- Tailwind theme tokens live in `tailwind.config.ts` if you want to adjust colors or typography.
- Global styles are defined in `app/globals.css`.
- Animation parameters can be tuned inside the relevant component files using Framer Motion props.

## Deployment
The project is configured for Vercel deployment (`vercel.json`). Push to the `main` branch to trigger the production deployment.

## License
© 2025 Yang Zhenzhao. All rights reserved.
