export const DESIGN_TOKENS = {
  colors: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    tertiary: "var(--color-tertiary)",
    neutral: "var(--color-neutral)",
    buttonInverted: "var(--color-button-inverted)",
  },
  typography: {
    fonts: {
      main: "var(--font-manrope)",
    },
    scale: {
      headline: "var(--text-headline)",
      body: "var(--text-body)",
      label: "var(--text-label)",
    },
  },
} as const;