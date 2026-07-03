export type SourcedImage = {
  src: string;
  alt: string;
  photographer?: string;
  pexelsUrl?: string;
};

/**
 * Keyed by MenuItem.slug (see app/lib/menu.ts). Consumers should look up
 * with `menuItemImages[item.slug]` and fall back to the existing
 * gradient+emoji placeholder when a slug isn't mapped, so partial
 * sourcing never breaks the build. Photos are free-to-use Pexels stock
 * photography, downloaded and converted to local WebP files under
 * public/images/ via the `image-optimizer` skill (.claude/skills/) rather
 * than hotlinked from images.pexels.com. `photographer`/`pexelsUrl` are
 * kept for attribution/provenance only — they're not fetched at runtime.
 */
export const menuItemImages: Record<string, SourcedImage> = {
  espresso: {
    src: "/images/menu/espresso.webp",
    alt: "Xícara de espresso servida em mesa de restaurante",
    photographer: "Wolfart",
    pexelsUrl: "https://www.pexels.com/photo/espresso-served-in-a-restaurant-18604200/",
  },
  cafezinho: {
    src: "/images/menu/cafezinho.webp",
    alt: "Xícara de cafezinho sobre uma máquina de espresso",
    photographer: "Mart Production",
    pexelsUrl: "https://www.pexels.com/photo/a-cup-of-coffee-on-an-espresso-machine-7162906/",
  },
  "cafe-com-leite": {
    src: "/images/menu/cafe-com-leite.webp",
    alt: "Xícara de café com leite sobre pires",
    photographer: "Medi Balazi",
    pexelsUrl: "https://www.pexels.com/photo/coffee-cup-on-saucer-244407/",
  },
  cappuccino: {
    src: "/images/menu/cappuccino.webp",
    alt: "Cappuccino com desenho de coração em espuma de leite sobre mesa de madeira",
    photographer: "Magda Ehlers",
    pexelsUrl:
      "https://www.pexels.com/photo/artistic-latte-with-heart-latte-art-on-wooden-table-31139336/",
  },
  "cafe-latte": {
    src: "/images/menu/cafe-latte.webp",
    alt: "Café latte com espuma cremosa em copo alto",
    photographer: "Saizstudio",
    pexelsUrl: "https://www.pexels.com/photo/cup-of-coffee-with-foam-20350467/",
  },
  "pastel-de-nata": {
    src: "/images/menu/pastel-de-nata.webp",
    alt: "Pastel de nata sobre papel, com massa folhada dourada",
    photographer: "bemistermister",
    pexelsUrl: "https://www.pexels.com/photo/delicious-portuguese-eggs-tart-on-paper-5677314/",
  },
  "croissant-amanteigado": {
    src: "/images/menu/croissant-amanteigado.webp",
    alt: "Croissants amanteigados recém-assados, close-up",
    photographer: "ffawdyy",
    pexelsUrl: "https://www.pexels.com/photo/close-of-photo-of-croissants-13425794/",
  },
  "torta-de-amendoa": {
    src: "/images/menu/torta-de-amendoa.webp",
    alt: "Fatia de torta de amêndoa elegante sobre prato branco",
    photographer: "Jose Perez Artesano",
    pexelsUrl:
      "https://www.pexels.com/photo/elegant-almond-tart-on-white-plate-with-black-background-31189420/",
  },
  "bolo-de-chocolate": {
    src: "/images/menu/bolo-de-chocolate.webp",
    alt: "Fatia de bolo de chocolate sobre pires de cerâmica",
    photographer: "Alexander Dummer",
    pexelsUrl: "https://www.pexels.com/photo/sliced-chocolate-cake-on-ceramic-saucer-132694/",
  },
  "bolo-de-fuba": {
    src: "/images/menu/bolo-de-fuba.webp",
    alt: "Fatia de bolo de fubá caseiro sobre prato tradicional",
    photographer: "Vivan Punk",
    pexelsUrl:
      "https://www.pexels.com/photo/delicious-homemade-corn-cake-slice-on-traditional-plate-34638000/",
  },
  "misto-quente": {
    src: "/images/menu/misto-quente.webp",
    alt: "Sanduíche misto quente grelhado com salada fresca, em cafeteria de São Paulo",
    photographer: "Ezequiel Campos",
    pexelsUrl:
      "https://www.pexels.com/photo/delicious-grilled-sandwich-and-fresh-salad-in-sao-paulo-cafe-29879921/",
  },
  "sanduiche-de-frango": {
    src: "/images/menu/sanduiche-de-frango.webp",
    alt: "Sanduíche de frango grelhado em close-up",
    photographer: "Murtada Mustafa",
    pexelsUrl: "https://www.pexels.com/photo/close-up-of-a-chicken-sandwich-9211149/",
  },
  bauru: {
    src: "/images/menu/bauru.webp",
    alt: "Sanduíche Bauru com rosbife e queijo derretido",
    photographer: "Anthony Rahayel",
    pexelsUrl: "https://www.pexels.com/photo/roast-beef-sandwiches-19585043/",
  },
  "sanduiche-vegetariano": {
    src: "/images/menu/sanduiche-vegetariano.webp",
    alt: "Sanduíche vegetariano fresco com rúcula e tomate",
    photographer: "novkov-visuals",
    pexelsUrl:
      "https://www.pexels.com/photo/fresh-gourmet-sandwiches-with-arugula-and-tomato-34644321/",
  },
  "baguete-de-atum": {
    src: "/images/menu/baguete-de-atum.webp",
    alt: "Baguete de atum com pepino e maionese",
    photographer: "Anya Dunes",
    pexelsUrl:
      "https://www.pexels.com/photo/delicious-tuna-salad-toast-with-cucumber-and-mayo-38275222/",
  },
  "ice-latte": {
    src: "/images/menu/ice-latte.webp",
    alt: "Ice latte gelado sobre mesa de madeira",
    photographer: "Nam Nguyễn",
    pexelsUrl: "https://www.pexels.com/photo/refreshing-iced-latte-on-wooden-table-35028555/",
  },
  "frappe-de-caramelo": {
    src: "/images/menu/frappe-de-caramelo.webp",
    alt: "Frappé de caramelo gelado em close-up",
    photographer: "Jdgromov",
    pexelsUrl: "https://www.pexels.com/photo/close-up-shot-of-a-caramel-frappe-7091587/",
  },
  "suco-de-laranja-natural": {
    src: "/images/menu/suco-de-laranja-natural.webp",
    alt: "Copo de suco de laranja natural",
    photographer: "TimMoor",
    pexelsUrl: "https://www.pexels.com/photo/delicious-fresh-orange-juice-6412586/",
  },
  "limonada-caseira": {
    src: "/images/menu/limonada-caseira.webp",
    alt: "Copo de limonada caseira com limões frescos e hortelã",
    photographer: "Gulsum Coban",
    pexelsUrl:
      "https://www.pexels.com/photo/refreshing-lemonade-with-fresh-lemons-and-mint-32692708/",
  },
  "cha-gelado-de-pessego": {
    src: "/images/menu/cha-gelado-de-pessego.webp",
    alt: "Chá gelado de pêssego com canudo e limão",
    photographer: "Sốc Nặng Dũng",
    pexelsUrl:
      "https://www.pexels.com/photo/refreshing-peach-iced-tea-with-straw-and-lemon-33573170/",
  },
};

export const heroImage: SourcedImage = {
  src: "/images/hero.webp",
  alt: "Interior aconchegante de cafeteria rústica com decoração vintage",
  photographer: "Jayce Q",
  pexelsUrl:
    "https://www.pexels.com/photo/cozy-rustic-cafe-interior-with-vintage-decor-35518412/",
};

export const aboutImages: SourcedImage[] = [
  {
    src: "/images/sobre/counter.webp",
    alt: "Balcão de cafeteria aconchegante com equipamentos de café",
    photographer: "Tran Minh Nguyen",
    pexelsUrl:
      "https://www.pexels.com/photo/cozy-hanoi-cafe-countertop-with-coffee-equipment-32617176/",
  },
  {
    src: "/images/sobre/barista.webp",
    alt: "Barista preparando arte em látte em uma cafeteria",
    photographer: "Tim Douglas",
    pexelsUrl: "https://www.pexels.com/photo/crop-barista-making-latte-art-6205779/",
  },
];
