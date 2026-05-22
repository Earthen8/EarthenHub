# EarthenHub Frontend

This is the frontend client for my personal portfolio website, built using **Next.js 15** and styled with **Tailwind CSS v4**.

It is structured to fetch data from the Django API and submit inquiries, while concurrently using **Resend** to forward inquiries to my personal email.

---

## Technical Stack

* **Next.js 15 (App Router)**: Hybrid Server/Client-side rendering.
* **React 19**: Modern declarative UI components.
* **Tailwind CSS v4**: Centralized, CSS variable-first styling engine.
* **TypeScript**: Type safety across models, API clients, and UI properties.
* **Resend SDK**: High-reliability transactional email API.

---

## Configuration & Environment Variables

Create a `.env.local` file in the root of the `frontend/` directory (see `frontend/.env.example` for details):

```env
# Next.js Server Settings
HOSTNAME=0.0.0.0
BACKEND_URL=http://backend:8000

# Direct backend API URL for server-side fetches (Django container/server)
NEXT_SERVER_API_URL=http://127.0.0.1:8000/api

# Resend Service API Key for contact inquiries
RESEND_API_KEY=re_your_api_key_here

# Cloudflare R2 Public Bucket URL (for reverse proxying media files)
R2_PUBLIC_URL=https://pub-xxxxxx.r2.dev
```

---

## API Proxy Routing

To prevent CORS issues, avoid hardcoding absolute paths, and mask the Cloudflare R2 bucket URLs, Next.js handles proxy routing internally via `next.config.ts`.

### 1. API Requests (`/api/*`)
* **Development Rewrite**: Proxies `/api/*` requests to your local Django server (`http://127.0.0.1:8000/api/*`).
* **Docker/Production Rewrite**: Proxies to the backend container (`http://backend:8000/api/*`) inside the Docker virtual network.
* All client-side API requests are made relative to `/api` (configured automatically in `src/lib/api.ts`).

### 2. Media Requests (`/media/*`)
* **Development Rewrite**: Proxies `/media/*` requests to the local Django server (`http://127.0.0.1:8000/media/*`) to serve locally stored images.
* **Docker/Production Rewrite**: Proxies directly to the public Cloudflare R2 bucket URL (`R2_PUBLIC_URL`) server-side.
* By proxying `/media` requests server-side, the client browser only ever sees the main domain (e.g. `https://earthen.my.id/media/projects/screenshot.png`), hiding the backend bucket domain (`*.r2.dev`) and preventing cross-origin asset resource sharing (CORS) issues for images.


---

## Styling System (Tailwind CSS v4)

We use a centralized design token system mapping Tailwind v4 themes directly to TypeScript for components.

### 1. Layers

1. **`src/app/globals.css`**: Defines CSS theme variables within Tailwind v4 `@theme` block.
2. **`src/constants/tokens.ts`**: Contains raw values used where CSS variables are unavailable (e.g., SVG canvas or canvas libraries).
3. **`src/constants/design-system.ts`**: Maps CSS variables to a TypeScript object (`DESIGN_TOKENS`) for type-safe inline styles.

### 2. Primary Color Tokens

| Token | Variable | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `primary` | `--color-primary` | `#FFDB70` | Brand Color (Warm Gold) |
| `secondary` | `--color-secondary` | `#1E1E1F` | Dark Card/Component Background |
| `tertiary` | `--color-tertiary` | `#D6D6D6` | Standard Muted Text |
| `neutral` | `--color-neutral` | `#121212` | Main Background |

### 3. Usage Example

**Tailwind class style**:
```html
<h1 class="text-headline text-primary">Hello World</h1>
```

**TypeScript/React inline style**:
```tsx
import { DESIGN_TOKENS } from '@/constants/design-system';

const style = { color: DESIGN_TOKENS.colors.primary };
```
