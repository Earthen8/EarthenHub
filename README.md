# EarthenHub - Styling System

This project uses **Tailwind CSS v4** with a centralized design token system.

## Design Architecture

The styling system is split into three layers for maximum flexibility and type safety:

1.  **`src/app/globals.css`**: The source of truth for Tailwind v4. Defines CSS variables within the `@theme` block.
2.  **`src/constants/tokens.ts`**: Contains the raw hex/value definitions for use in scenarios where CSS variables aren't accessible (e.g., external libraries).
3.  **`src/constants/design-system.ts`**: Maps CSS variables to a TypeScript object (`DESIGN_TOKENS`) for type-safe usage in React components.

## Color Palette

| Token | Variable | Hex Value | Description |
| :--- | :--- | :--- | :--- |
| `primary` | `--color-primary` | `#FFDB70` | Primary brand color (Yellow) |
| `secondary` | `--color-secondary` | `#1E1E1F` | Secondary background/accent |
| `tertiary` | `--color-tertiary` | `#D6D6D6` | Text and subtle accents |
| `neutral` | `--color-neutral` | `#121212` | Main background color |
| `buttonInverted` | `--color-button-inverted` | `#E1E1E1` | Inverted button state |

## Typography

### Font Families
- **Main**: `Manrope`, sans-serif (`--font-manrope`)

### Text Scales
Mapped to Tailwind utility classes (e.g., `text-headline`):

| Scale | Value | Variable |
| :--- | :--- | :--- |
| `headline` | `2rem` | `--text-headline` |
| `body` | `1rem` | `--text-body` |
| `label` | `0.875rem` | `--text-label` |

## Usage

### In Tailwind (CSS/Classes)
Tailwind v4 automatically detects variables in the `@theme` block:
```html
<h1 class="text-headline text-primary">Hello World</h1>
```

### In TypeScript/React
Use the `DESIGN_TOKENS` constant for dynamic styling:
```tsx
import { DESIGN_TOKENS } from '@/constants/design-system';

const style = { color: DESIGN_TOKENS.colors.primary };
```
