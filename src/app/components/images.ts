// Centralized Unsplash imagery for the Wakanda Ouaga landing page.
const u = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const IMAGES = {
  heroLounge: u('1657089455408-60d44775094a', 1600, 1000),
  loungeAlt: u('1697397546154-cb891a4293ef', 1000, 1200),
  soulTexture: u('1578509566163-068acd11b8e7', 1200, 1400),
  soulArt: u('1726208227601-7728c8b3849b', 1200, 900),
};

export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  category: string;
  image: string;
};

export const MENU: MenuItem[] = [
  {
    id: 'antilope',
    name: "Brochettes d'Antilope",
    tagline: 'Sauce tamarin, oignons braisés & piment doux',
    price: '18 000 CFA',
    category: 'Signature',
    image: u('1676300184761-92585b329535', 900, 1100),
  },
  {
    id: 'ecarlate-royale',
    name: "L'Écarlate Royale",
    tagline: 'Bissap infusé, gin de baobab & fumée de karité',
    price: '9 500 CFA',
    category: 'Cocktail',
    image: u('1778856921999-fa0640c55acb', 900, 1100),
  },
  {
    id: 'panthere',
    name: "Filet de la Panthère",
    tagline: 'Bœuf mariné, réduction de gingembre & fonio doré',
    price: '24 000 CFA',
    category: 'Signature',
    image: u('1663530761401-15eefb544889', 900, 1100),
  },
  {
    id: 'ouaga-fizz',
    name: 'Ouaga Gold Fizz',
    tagline: 'Rhum ambré, tamarin, feuille dorée & agrumes',
    price: '11 000 CFA',
    category: 'Cocktail',
    image: u('1761361371739-546f12a9cee4', 900, 1100),
  },
  {
    id: 'terrasse',
    name: 'Assiette Terrasse Étoilée',
    tagline: 'Grillades du chef, sauce arachide & légumes fumés',
    price: '21 000 CFA',
    category: 'Partage',
    image: u('1778662995076-ea652118f917', 900, 1100),
  },
  {
    id: 'ancestral',
    name: "L'Ancestral",
    tagline: 'Cocktail épicé, cannelle, miel sauvage & braise',
    price: '10 500 CFA',
    category: 'Cocktail',
    image: u('1761315413023-96ead2bc95e9', 900, 1100),
  },
];
