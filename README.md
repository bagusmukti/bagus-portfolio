# Portfolio — Full-Stack Developer

A polished personal portfolio built with **React 18 + TypeScript + Vite**, styled with pure CSS Modules. No UI libraries, no animation libraries — everything hand-crafted.

**Design language:** Lavender Mist — soft indigo/peach palette, Fraunces serif headings, DM Sans body, full dark-mode support.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build
```

---

## Personalizing the content

All portfolio content lives in one file: **`src/data.ts`**

Open it and edit the exported objects:

| Object | What to change |
|---|---|
| `personal` | Name, role, location, email, WhatsApp, social links, bio, chips, stats |
| `skills` | Skill categories, tags, and level labels |
| `projects` | Project cards — title, stack, description, year, links |
| `experience` | Work history — period, company, role, description, stack |

---

## Adding your photo

1. Drop your photo into `/public/` — e.g. `public/photo.jpg`
2. In `src/data.ts`, set:

```ts
personal = {
  // ...
  photo: '/photo.jpg',
}
```

The avatar in the About section will display it automatically.

---

## Adding project screenshots

1. Drop screenshots into `public/projects/` — e.g. `public/projects/ecommerce.png`
2. In `src/data.ts`, set the `image` field on the relevant project:

```ts
{ num: '01', title: 'E-Commerce Platform', ..., image: '/projects/ecommerce.png' }
```

---

## Deploying

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at vercel.com — it will detect Vite automatically.

### Netlify

```bash
npm run build
# drag-and-drop the /dist folder at app.netlify.com/drop
```

Or connect your repo and set:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

## Project structure

```
src/
  components/
    Navbar.tsx          sticky nav with curtain navigation
    Particles.tsx       canvas particle system (Hero bg)
    MagneticTag.tsx     magnetic hover skill tags
  sections/
    Hero.tsx            landing with typing animation + blobs
    About.tsx           sidebar + bio + chips
    Skills.tsx          skill rows with magnetic tags
    Projects.tsx        2-col project card grid
    Experience.tsx      timeline work history
    Contact.tsx         contact info + message form
    Footer.tsx          minimal footer
  hooks/
    useReveal.ts        IntersectionObserver scroll reveal
    useTyping.ts        cycling typewriter effect
    useCursor.ts        custom cursor with trail
    useCurtain.ts       full-screen indigo slide transition
  styles/
    globals.css         CSS variables (light + dark), reset, reveal classes
  data.ts               single source of truth for all content
  App.tsx               root — mounts hooks + composes sections
  main.tsx              React entry point
public/
  projects/             place project screenshots here
```

---

## Customising the design

All color and typography tokens are CSS variables in `src/styles/globals.css` under `:root` (light) and `@media (prefers-color-scheme: dark)`. Change them there to retheme the entire site instantly.
