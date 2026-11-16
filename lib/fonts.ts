import { Outfit } from "next/font/google";

export const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans-site",
});
