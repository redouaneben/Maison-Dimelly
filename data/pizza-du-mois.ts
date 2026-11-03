import type { StaticImageData } from "next/image";

import pizzaDuMoisImage from "../IMGS/pizzadumois.jpg";

/** Mise en avant mensuelle — photo et recette à personnaliser */
export const pizzaDuMois = {
  name: "Pizza du mois",
  ingredients:
    "Base crème, jambon cru, copeaux de parmesan, touches de fromage frais, olives noires, filet de crème de balsamique.",
  price: 15.3,
  image: pizzaDuMoisImage as StaticImageData,
  imageAlt: "Pizza du mois — Maison Dimelly",
} as const;
