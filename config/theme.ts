/**
 * Design system — Maison Dimelly (pizzeria).
 * Couleurs injectées en variables `--resto-*` dans `app/layout.tsx`.
 */
export const theme = {
  colors: {
    paper: "#F6EFE4",
    brand: "#C60004",
    brandDark: "#8E0003",
    brandSoft: "#E24B4E",
    accent: "#3E7A4F",
    ink: "#2C1814",
    surface: "#FFFCF8",
    statusClosed: "#E8E0D6",
    heroOverlay: "#2C1814",
  },
  decorBrandFilter:
    "brightness(0) saturate(100%) invert(16%) sepia(42%) saturate(3200%) hue-rotate(338deg) brightness(88%) contrast(96%)",
  fonts: {
    script: "Fraunces",
    sans: "Outfit",
  },
} as const;
