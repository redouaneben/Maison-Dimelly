/**
 * Identité & coordonnées — Maison Dimelly, Chaponnay.
 * URL canonique : NEXT_PUBLIC_SITE_URL en prod (Vercel).
 */
const defaultUrl = "https://maison-dimelly.fr";

export const siteConfig = {
  name: "Maison Dimelly",
  legalName: "Maison Dimelly",
  tagline: "Pizzas & grignotages",
  pickupLabel: "Pizzas & grignotages",
  heroTagline:
    "Pizzas, panuzzo et grignotages à emporter, au cœur de Chaponnay.",
  footerLine: "Pizzas & grignotages",
  locale: "fr_FR" as const,
  language: "fr" as const,

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl).replace(/\/$/, ""),

  phone: {
    display: "04 78 96 77 03",
    href: "tel:+33478967703",
  },

  address: {
    streetAddress: "9 Rue Centrale",
    postalCode: "69970",
    addressLocality: "Chaponnay",
    addressCountry: "FR",
  },

  /** Laisser `href` vide pour masquer le lien dans le pied de page */
  facebook: {
    href: "",
    label: "Facebook",
  },

  map: {
    embedUrl:
      "https://maps.google.com/maps?q=9+Rue+Centrale,+69970+Chaponnay&z=16&output=embed",
  },

  seo: {
    title: "Maison Dimelly | Pizzas & grignotages à Chaponnay",
    description:
      "Pizzeria à emporter au 9 rue Centrale à Chaponnay. Pizzas tomate et crème, spéciales, panuzzo, desserts. Commande au 04 78 96 77 03.",
    keywords: [
      "Maison Dimelly",
      "pizza Chaponnay",
      "pizzas à emporter",
      "panuzzo",
      "Chaponnay",
      "grignotages",
    ],
    ogDescription:
      "Carte des pizzas, panuzzo et grignotages. 9 rue Centrale, Chaponnay. 04 78 96 77 03.",
    twitterDescription:
      "Pizzas à emporter à Chaponnay. Carte et téléphone 04 78 96 77 03.",
    ogImageAlt: "Maison Dimelly — pizzas et grignotages à Chaponnay",
  },

  business: {
    servesCuisine: "Pizza italienne",
    priceRange: "€€",
  },
} as const;

export function getAddressLines(): [string, string] {
  const { streetAddress, postalCode, addressLocality } = siteConfig.address;
  return [streetAddress, `${postalCode} ${addressLocality}`];
}

export function getFullAddress(): string {
  const [l1, l2] = getAddressLines();
  return `${l1}, ${l2}`;
}
