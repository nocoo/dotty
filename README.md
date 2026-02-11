# basalt

> **Dense. Dark. Durable.**
> A matte-dark design system engineered for high-density SaaS interfaces.

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black.svg?style=flat-square&logo=next.js)](https://nextjs.org)
[![Style: Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

![Basalt Preview](https://assets.lizheng.me/wp-content/uploads/2026/02/basalt-scaled.jpg)

## Philosophy

**Basalt** is not just another dark mode. It is a study in contrast and subtlety. Inspired by the fine-grained, volcanic rock, this theme prioritizes a **matte finish** over glossy reflections. It is designed for developers who build tools, not toys.

* **Subdued, not dim.** Calculated contrast ratios ensure readability without eye strain.
* **Structure over decoration.** Borderless containers defined by luminance depth.
* **Precision engineered.** 14px base typography with razor-thin 1px strokes.

## Features

* **Matte Surface:** Built on a `zinc-950` foundation, avoiding absolute blacks for a richer, softer visual field.
* **Micro-Typography:** Standardized `14px` base font size with `400/500` weights for clean, data-heavy layouts.
* **Ultra-Thin Iconography:** Optimized for `16px` icons with `1.5px` stroke widths using Lucide/Heroicons.
* **Fluid Geometry:** Generous `rounded-xl` corners paired with sophisticated negative space.
* **shadcn/ui Compatible:** Drop-in variables for your existing component library.

## Tech Stack

* **Core:** [React](https://react.dev) / [Next.js](https://nextjs.org)
* **Styling:** [Tailwind CSS](https://tailwindcss.com)
* **Components:** [shadcn/ui](https://ui.shadcn.com)
* **Icons:** [Lucide React](https://lucide.dev)

## Integration

**Basalt** is distributed as a configuration preset. Simply update your `globals.css` to adopt the volcanic palette.

### 1. Update CSS Variables

Replace your `:root` variables in `globals.css`:

```css
@layer base {
  :root {
    --background: 240 5.9% 10%; /* Zinc 950 */
    --foreground: 0 0% 98%;
    --card: 240 5.9% 10%;
    --card-foreground: 0 0% 98%;
    --popover: 240 5.9% 10%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --radius: 0.75rem; /* 12px */
  }
}
```
