/**
 * Mentions légales — compléter avant mise en facturation / domaine définitif.
 * Blueprint : copier et adapter par client.
 */
export const legalConfig = {
  /** Responsable de publication (gérant ou représentant légal) */
  publisherName: "[Nom du gérant — à compléter]",
  publisherRole: "Gérant",

  /**
   * Contact RGPD / mentions. Tant que la valeur commence par « [ », le site
   * affiche le téléphone de `config/site.ts` à la place.
   */
  contactEmail: "[email@exemple.fr — à compléter]",

  /** Identifiants entreprise (France) */
  siret: "938 330 040 00016",
  rcs: "Lyon 938 330 040",

  /** Hébergement du site */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },

  /** Dernière mise à jour des textes */
  lastUpdated: "28 octobre 2026",
} as const;
