export type MenuItem = {
  name: string;
  /** Vide pour une ligne qui n'a pas de composition (boisson, plaque). */
  ingredients: string;
  price: number | null;
  /** Remplace le montant : « Sur devis », « Sur demande ». */
  priceLabel?: string;
  spicy?: boolean;
};

export type MenuSection = {
  id: string;
  nav: string;
  title: string;
  intro?: string;
  footnote?: string;
  items: MenuItem[];
};

/** Carte Maison Dimelly — une seule taille, prix de la carte transmise. */
export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "menu-tomate",
    nav: "Tomate",
    title: "Pizzas base tomate",
    items: [
      {
        name: "Margua",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, huile d'olive.",
        price: 8,
      },
      {
        name: "Margherita authentique",
        ingredients:
          "Tomate San Marzano, mozzarella di Bufala, basilic, huile d'olive.",
        price: 10.5,
      },
      {
        name: "Camille",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, jambon blanc, olives Taggiasca.",
        price: 11.5,
      },
      {
        name: "Renata",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, jambon blanc, champignons, olives Taggiasca.",
        price: 12,
      },
      {
        name: "Calzone (chausson)",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, jambon blanc, champignons, œuf, olives Taggiasca.",
        price: 12.5,
      },
      {
        name: "Quatro",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, gorgonzola, Taleggio, chèvre.",
        price: 12.5,
      },
      {
        name: "Napoletana",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, anchois, câpres.",
        price: 12,
      },
      {
        name: "Carnivora",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, viande hachée, cheddar, oignon rouge, olives Taggiasca.",
        price: 13,
      },
      {
        name: "Pollo",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, émincé de poulet, merguez, oignon rouge, olives Taggiasca.",
        price: 14,
      },
      {
        name: "Calabrese",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, spianata piquante, poivrons, oignon rouge, pointe de ricotta, olives Taggiasca.",
        price: 14,
        spicy: true,
      },
      {
        name: "Piquante",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, merguez, spianata piquante, olives Taggiasca.",
        price: 14,
        spicy: true,
      },
      {
        name: "Verde",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, poivrons, aubergines marinées, artichauts marinés, pesto, crème de vinaigre balsamique.",
        price: 13,
      },
      {
        name: "Al tonno",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, thon, oignon rouge.",
        price: 10.5,
      },
    ],
  },
  {
    id: "menu-creme",
    nav: "Crème",
    title: "Pizzas base crème",
    items: [
      {
        name: "Dimelly",
        ingredients:
          "Crème, mozzarella fior di latte, pommes de terre, Taleggio, lardons, oignon rouge.",
        price: 13,
      },
      {
        name: "Capra",
        ingredients: "Crème, mozzarella fior di latte, bûche de chèvre, miel.",
        price: 11.5,
      },
      {
        name: "Campagnola",
        ingredients:
          "Crème, emmental, lardons, champignons, oignon rouge, olives Taggiasca.",
        price: 12.5,
      },
      {
        name: "Salmone",
        ingredients:
          "Crème, mozzarella fior di latte, saumon, vinaigre citron et thé vert, ciboulette.",
        price: 13,
      },
      {
        name: "Del gorgo",
        ingredients: "Crème, emmental, gorgonzola AOP, jambon blanc.",
        price: 12.5,
      },
      {
        name: "Speziato",
        ingredients: "Crème au curry, mozzarella fior di latte, poulet, poivrons.",
        price: 13.5,
      },
      {
        name: "Carbonarella",
        ingredients:
          "Crème, mozzarella fior di latte, pancetta grillée, pecorino. Après cuisson : jaune d'œuf.",
        price: 13.5,
      },
      {
        name: "Raviole",
        ingredients: "Crème, mozzarella fior di latte, lardons, ravioles.",
        price: 13,
      },
      {
        name: "Raclette",
        ingredients:
          "Crème, fromage à raclette, pommes de terre, oignons rouges, jambon blanc.",
        price: 12.5,
      },
      {
        name: "Marcellino",
        ingredients:
          "Crème, mozzarella fior di latte, émincé de poulet, Saint-Marcellin, oignon rouge.",
        price: null,
        priceLabel: "Sur demande",
      },
    ],
  },
  {
    id: "menu-speciales",
    nav: "Spéciales",
    title: "Spéciales",
    items: [
      {
        name: "Romy",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, jambon blanc, artichauts marinés, champignons, scamorza fumée, olives taggiasche.",
        price: 16,
      },
      {
        name: "Al miele",
        ingredients:
          "Crème, mozzarella fior di latte, jambon de Parme, Rocamadour AOP, confiture de figues, miel.",
        price: 15,
      },
      {
        name: "Tartufata",
        ingredients:
          "Crème à la truffe, mozzarella fior di latte, mortadelle à la truffe, stracciatella.",
        price: 16.5,
      },
      {
        name: "Pistacchio",
        ingredients:
          "Crème, mozzarella fior di latte, mortadelle à la pistache, pesto de pistache, stracciatella, éclats de pistache.",
        price: 16.5,
      },
      {
        name: "Rustica",
        ingredients:
          "Crème, mozzarella fior di latte, Saint-Marcellin, pancetta, oignons caramélisés.",
        price: 14.5,
      },
      {
        name: "Boscoso",
        ingredients:
          "Crème à la cèpe, scamorza fumée, poulet, oignons caramélisés.",
        price: 14.5,
      },
      {
        name: "Grintosa",
        ingredients:
          "Crème à la moutarde à l'ancienne, mozzarella fior di latte, poulet, poivrons, oignon rouge.",
        price: 12.5,
      },
      {
        name: "Golosa",
        ingredients: "Pizza sucrée. Crème, pâte à tartiner, banane.",
        price: 8.5,
      },
    ],
  },
  {
    id: "menu-panuzzo",
    nav: "Panuzzo",
    title: "Panuzzo",
    intro: "Panini à base de pâte à pizza.",
    items: [
      {
        name: "Classico",
        ingredients: "Tomate San Marzano, jambon blanc, mozzarella fior di latte.",
        price: 8,
      },
      {
        name: "Formaggioso",
        ingredients:
          "Tomate San Marzano, mozzarella fior di latte, chèvre, gorgonzola, Taleggio.",
        price: 8,
      },
      {
        name: "Pistacchioso",
        ingredients:
          "Roquette, mortadelle à la pistache, stracciatella, pesto de pistache.",
        price: 8,
      },
      {
        name: "Parma verde",
        ingredients: "Roquette, jambon de Parme, stracciatella, pesto.",
        price: 8,
      },
      {
        name: "Panaburger",
        ingredients:
          "Tomate San Marzano, viande hachée, mozzarella fior di latte, cheddar, sauce burger.",
        price: 8,
      },
    ],
  },
  {
    id: "menu-petite-faim",
    nav: "Petite faim",
    title: "Petite faim",
    items: [
      {
        name: "Pizzeta",
        ingredients:
          "Petite pizza en forme de barque. Choisissez la saveur sur la carte. Hors Margherita authentique.",
        price: 6.5,
      },
      {
        name: "Croc'dog",
        ingredients:
          "Pâte à pizza en forme de barque, saucisse hot-dog, ketchup ou mayonnaise ou moutarde, oignons frits.",
        price: 7,
      },
      {
        name: "Arancini 90 g",
        ingredients: "Plusieurs saveurs selon la semaine.",
        price: 3,
      },
      {
        name: "Arancini 180 g",
        ingredients: "Plusieurs saveurs selon la semaine.",
        price: 6,
      },
    ],
  },
  {
    id: "menu-apero",
    nav: "Apéro",
    title: "Pour l'apéro",
    items: [
      {
        name: "L'aperitivo",
        ingredients: "Pizza blanche, huile d'olive, origan.",
        price: 4.5,
      },
      {
        name: "Planche charcuterie / fromage / antipasti / bouchées italiennes",
        ingredients: "Composition sur devis.",
        price: null,
        priceLabel: "Sur devis",
      },
    ],
  },
  {
    id: "menu-plaques",
    nav: "Plaques",
    title: "Plaque pizza",
    items: [
      { name: "Plaque Camille", ingredients: "Format plaque.", price: 30 },
      { name: "Plaque Renata", ingredients: "Format plaque.", price: 32 },
      { name: "Plaque Quatro", ingredients: "Format plaque.", price: 36 },
      { name: "Plaque Campagnola", ingredients: "Format plaque.", price: 33 },
      { name: "Plaque Salmone", ingredients: "Format plaque.", price: 36 },
      { name: "Plaque Capra", ingredients: "Format plaque.", price: 31 },
      {
        name: "Autres saveurs",
        ingredients: "Format plaque, selon la carte.",
        price: null,
        priceLabel: "Sur devis",
      },
    ],
  },
  {
    id: "menu-desserts",
    nav: "Desserts",
    title: "Desserts",
    footnote:
      "Les noms « Canoncino » et « Canulcchi » sont retranscrits tels qu'ils apparaissent sur la carte.",
    items: [
      { name: "Tiramisu café", ingredients: "", price: 4.5 },
      { name: "Tiramisu nocciolata", ingredients: "", price: 4.95 },
      { name: "Canolo", ingredients: "", price: 4.95 },
      { name: "Canoncino", ingredients: "", price: 1.6 },
      { name: "Canulcchi", ingredients: "", price: 2.5 },
      { name: "Glace", ingredients: "", price: 3.95 },
    ],
  },
  {
    id: "menu-boissons",
    nav: "Boissons",
    title: "Boissons",
    items: [
      { name: "Canettes", ingredients: "", price: 1.9 },
      { name: "Eau", ingredients: "", price: 1 },
      { name: "Eau gazeuse", ingredients: "", price: 1.9 },
      { name: "Jus de fruit", ingredients: "", price: 2.5 },
      { name: "Limonade artisanale sicilienne", ingredients: "", price: 3.5 },
      { name: "Desperados", ingredients: "", price: 3.5 },
      { name: "Bière Marius", ingredients: "", price: 4.5 },
      { name: "Heineken", ingredients: "", price: 2.5 },
    ],
  },
];
