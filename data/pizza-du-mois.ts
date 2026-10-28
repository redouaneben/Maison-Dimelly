import type { StaticImageData } from "next/image";

import pizzaDuMoisImage from "../IMGS/pizzadumois.jpg";

/** Mise en avant mensuelle — photo et recette à personnaliser */
export const pizzaDuMois = {
  name: "Plat du mois",
  ingredients:
    "Description des ingrédients et de la recette du moment (exemple template).",
  price: 14.0,
  image: pizzaDuMoisImage as StaticImageData,
  imageAlt: "Plat du mois — photo d'exemple",
} as const;
