import { Fraunces, Outfit } from "next/font/google";

import { theme } from "@/config/theme";

/** Polices Google — noms dans `config/theme.ts` (documentation) */
export const logoScript = Fraunces({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans-site",
});

void theme.fonts;
