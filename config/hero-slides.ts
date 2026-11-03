import type { StaticImageData } from "next/image";

import { siteConfig } from "@/config/site";

import heroStorefront from "../IMGS/header.png";
import heroTable from "../IMGS/header1.png";
import heroSalmon from "../IMGS/header2.png";

export type HeroSlide = { src: StaticImageData; alt: string };

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: heroSalmon,
    alt: `Pizza au saumon — ${siteConfig.name}`,
  },
  {
    src: heroTable,
    alt: `Pizza garnie sur nappe vichy — ${siteConfig.name}`,
  },
  {
    src: heroStorefront,
    alt: `${siteConfig.name} — façade de la pizzeria à ${siteConfig.address.addressLocality}`,
  },
];
