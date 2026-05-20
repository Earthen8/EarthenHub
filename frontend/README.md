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

Create a `.env.local` file in the root of the `frontend/` directory:

```env
# Relative API route for browser requests (uses Next.js rewrites)
NEXT_PUBLIC_API_URL=/api

# Direct backend API URL for server-side fetches (Django container/server)
NEXT_SERVER_API_URL=http://127.0.0.1:8000/api

# Resend Service API Key for contact inquiries
RESEND_API_KEY=re_your_api_key_here
```

---

## API Proxy Routing

To prevent CORS issues and avoid hardcoding absolute paths, Next.js handles proxying `/api` and `/media` requests internally via `next.config.ts`.

* **Development Rewrite**: Proxies `/api/*` and `/media/*` requests to your local Python server (`http://127.0.0.1:8000`).
* **Docker/Production Rewrite**: Proxies to the backend container (`http://backend:8000`) inside the Docker virtual network.

All client-side API requests should be made relative to `/api` (configured automatically in `src/lib/api.ts`).

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
