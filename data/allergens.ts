/**
 * Allergènes majeurs (UE) déduits des ingrédients de la carte.
 * Pâte à pizza → gluten ; mozzarella, crème et fromages → lait.
 * Indicatif : à faire valider sur l'affiche officielle en boutique.
 */
export const PIZZA_ALLERGENS: Record<string, string[]> = {
  Margua: ["Gluten", "Lait"],
  "Margherita authentique": ["Gluten", "Lait"],
  Camille: ["Gluten", "Lait"],
  Renata: ["Gluten", "Lait"],
  "Calzone (chausson)": ["Gluten", "Lait", "Œufs"],
  Quatro: ["Gluten", "Lait"],
  Napoletana: ["Gluten", "Lait", "Poisson"],
  Carnivora: ["Gluten", "Lait"],
  Pollo: ["Gluten", "Lait"],
  Calabrese: ["Gluten", "Lait"],
  Piquante: ["Gluten", "Lait"],
  Verde: ["Gluten", "Lait", "Sulfites"],
  "Al tonno": ["Gluten", "Lait", "Poisson"],

  Dimelly: ["Gluten", "Lait"],
  Capra: ["Gluten", "Lait"],
  Campagnola: ["Gluten", "Lait"],
  Salmone: ["Gluten", "Lait", "Poisson", "Sulfites"],
  "Del gorgo": ["Gluten", "Lait"],
  Speziato: ["Gluten", "Lait"],
  Carbonarella: ["Gluten", "Lait", "Œufs"],
  Raviole: ["Gluten", "Lait", "Œufs"],
  Raclette: ["Gluten", "Lait"],
  Marcellino: ["Gluten", "Lait"],

  Romy: ["Gluten", "Lait"],
  "Al miele": ["Gluten", "Lait"],
  Tartufata: ["Gluten", "Lait"],
  Pistacchio: ["Gluten", "Lait", "Fruits à coque"],
  Rustica: ["Gluten", "Lait"],
  Boscoso: ["Gluten", "Lait"],
  Grintosa: ["Gluten", "Lait", "Moutarde"],
  Golosa: ["Gluten", "Lait", "Fruits à coque"],

  Classico: ["Gluten", "Lait"],
  Formaggioso: ["Gluten", "Lait"],
  Pistacchioso: ["Gluten", "Lait", "Fruits à coque"],
  "Parma verde": ["Gluten", "Lait"],
  Panaburger: ["Gluten", "Lait"],

  Pizzeta: ["Gluten", "Lait", "Selon la saveur choisie"],
  "Croc'dog": ["Gluten", "Œufs ou moutarde selon la sauce"],
  "Arancini 90 g": ["Selon la saveur de la semaine"],
  "Arancini 180 g": ["Selon la saveur de la semaine"],

  "L'aperitivo": ["Gluten"],
  "Planche charcuterie / fromage / antipasti / bouchées italiennes": [
    "Selon la composition",
  ],

  "Plaque Camille": ["Gluten", "Lait"],
  "Plaque Renata": ["Gluten", "Lait"],
  "Plaque Quatro": ["Gluten", "Lait"],
  "Plaque Campagnola": ["Gluten", "Lait"],
  "Plaque Salmone": ["Gluten", "Lait", "Poisson", "Sulfites"],
  "Plaque Capra": ["Gluten", "Lait"],
  "Autres saveurs": ["Selon la saveur"],

  "Tiramisu café": ["Gluten", "Lait", "Œufs"],
  "Tiramisu nocciolata": ["Gluten", "Lait", "Œufs", "Fruits à coque"],
  Canolo: ["Gluten", "Lait", "Œufs"],
  Canoncino: ["Composition à confirmer en boutique"],
  Canulcchi: ["Composition à confirmer en boutique"],
  Glace: ["Lait"],

  Canettes: ["Selon la canette"],
  Eau: ["Aucun allergène majeur indiqué"],
  "Eau gazeuse": ["Aucun allergène majeur indiqué"],
  "Jus de fruit": ["Aucun allergène majeur indiqué"],
  "Limonade artisanale sicilienne": ["Aucun allergène majeur indiqué"],
  Desperados: ["Gluten"],
  "Bière Marius": ["Gluten"],
  Heineken: ["Gluten"],
  "Pizza du mois": ["Gluten", "Lait"],
};

export const ALLERGEN_DISCLAIMER =
  "Liste indicative, déduite des ingrédients. En cas d'allergie sévère, confirmez en boutique ou au 04 78 96 77 03.";

/** Libellés allergènes uniquement (sans mention ingrédients ni disclaimer) */
export function getPizzaAllergenTags(pizzaName: string): string[] {
  const tags = PIZZA_ALLERGENS[pizzaName];
  if (tags?.length) return tags;
  return ["Non répertoriée — affiche en boutique"];
}
