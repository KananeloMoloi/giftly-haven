export type Category = 'sweet-gifts' | 'salty-gifts' | 'jewelry' | 'outdoors' | 'study-snacks' | 'drinks';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  image: string;
  contents: string[];
  inStock: boolean;
}

export const categoryInfo: { id: Category; name: string; emoji: string; image: string }[] = [
  { id: 'sweet-gifts', name: 'Sweet Gifts', emoji: '🍫', image: '/images/cat-sweet-gifts.jpg' },
  { id: 'salty-gifts', name: 'Salty Gifts', emoji: '🥨', image: '/images/cat-salty-gifts.jpg' },
  { id: 'jewelry', name: 'Jewelry', emoji: '💎', image: '/images/cat-jewelry.jpg' },
  { id: 'outdoors', name: 'Outdoors', emoji: '🏕️', image: '/images/cat-outdoors.jpg' },
  { id: 'study-snacks', name: 'Study Snacks', emoji: '📚', image: '/images/cat-study-snacks.jpg' },
  { id: 'drinks', name: 'Drinks', emoji: '☕', image: '/images/cat-drinks.jpg' },
];

// Images will be imported where used — these are placeholder paths
// Replace with actual product photos for production
export const products: Product[] = [
  {
    id: 'choco-vault',
    name: 'Choco Vault',
    description: 'A sweet chocolate box packed with Kit Kat, Tex, Astros and Smarties with a custom card.',
    longDescription: 'The Choco Vault is a delightful chocolate gift box bursting with everyone\'s favourite treats. Packed inside a stylish round gift box, it features iconic South African favourites paired with a personalised custom message card — perfect for birthdays, thank yous, or any sweet occasion.',
    price: 190,
    category: 'sweet-gifts',
    image: '/images/product-choco-vault.png',
    contents: ['2 Kit Kat bars', '2 Tex bars', '2 Astros / 2 Smarties', '1 Custom Card'],
    inStock: true,
  },
  {
    id: 'bluvante',
    name: 'Bluvante',
    description: 'A premium men\'s lifestyle set with belt, wallet, cologne, watch and notebook.',
    longDescription: 'The Bluvante is our signature executive gift for the modern man. Presented in a luxe royal-blue lined box with a satin ribbon, it brings together everyday essentials elevated to gift-worthy status.',
    price: 1600,
    category: 'jewelry',
    image: '/images/product-bluvante.png',
    contents: ['1 Redbat/Relay/Markham Belt', '1 Redbat Wallet / Card Holder', '1 Hemisphere Cologne', '1 Watch', '1 Notebook'],
    inStock: true,
  },
  {
    id: 'radiance',
    name: 'Radiance',
    description: 'An elegant jewellery set with silver necklace, earrings, watch and custom card.',
    longDescription: 'Radiance is a graceful gift set designed to make her shine. Featuring a sparkling silver heart necklace, matching earrings and a refined silver watch — all paired with a personalised message card.',
    price: 380,
    category: 'jewelry',
    image: '/images/product-radiance.png',
    contents: ['1 Silver Necklace', '1 Set Earrings', '1 Watch', '1 Custom Messaged Card'],
    inStock: true,
  },
  {
    id: 'indulgence',
    name: 'Indulgence',
    description: 'A luxurious hamper of wine, pretzels, biltong, sweets and peanuts.',
    longDescription: 'Indulgence is a curated treat hamper bringing together fine wine and savoury-sweet snacks. Choose between Robertson Sweet, Sparkling, Chapel or Non-Alcoholic — paired with a generous selection of nibbles.',
    price: 800,
    category: 'drinks',
    image: '/images/product-indulgence.png',
    contents: ['1 Robertson Wine (Sweet / Sparkling / Chapel / Non-Alcoholic)', '1 Pretzels', '1 Biltong', '1 Sour/Sweet Candy', '1 Pack Sweets', '1 Pack Peanuts'],
    inStock: true,
  },
  {
    id: 'executive-grooming',
    name: 'Executive Grooming',
    description: 'A complete men\'s grooming set with Nivea essentials and Lindt chocolate.',
    longDescription: 'The Executive Grooming box is the ultimate self-care gift for him. Filled with trusted Nivea Men grooming essentials and a touch of luxury Lindt chocolate, it\'s a thoughtful all-in-one pamper kit.',
    price: 700,
    category: 'outdoors',
    image: '/images/product-executive-grooming.png',
    contents: ['2 Body Lotions', '1 Roll-on', '1 Face Towel', '1 Body Scrub', '1 Hand Lotion', '1 Face Cream', '1 Lindt Chocolate (Dark / Milk)'],
    inStock: true,
  },
  {
    id: 'chill-crate',
    name: 'Chill Crate',
    description: 'A loaded snack crate with Doritos, Oreos, Powerade, Ferrero Rocher and more.',
    longDescription: 'The Chill Crate is built for movie nights, study breaks or unwinding after a long week. Packed with a vibrant mix of crunchy, sweet and refreshing favourites.',
    price: 470,
    category: 'study-snacks',
    image: '/images/product-chill-crate.png',
    contents: ['2 Doritos', '2 Oreo Cookies', '1 Powerade', '1 Ferrero Rocher 3-piece', '2 Smarties', '1 Dairy Milk Chocolate', '1 Pack Sweets', '1 Energy Bar', '1 Wafer Sticks'],
    inStock: true,
  },
  {
    id: 'boost-box',
    name: 'Boost Box',
    description: 'The ultimate energy-packed snack box with Red Bull, biltong, chocolates and more.',
    longDescription: 'The Boost Box is our most loaded gift — designed for the hustler, the student or the friend who needs a serious pick-me-up. A massive mix of energy drinks, snacks and sweets in one impressive box.',
    price: 700,
    category: 'study-snacks',
    image: '/images/product-boost-box.png',
    contents: ['2 Doritos', '2 KitKat Candy', '2 Red Bull Cans', '2 Energy Bars', '2 Packs Cookies', '2 Bar One', '2 Oreos', '1 Biltong', '2 Coffee Sachets', '1 Energy Protein Bar', '2 Lollipops', '1 Super C Energy Sweets', '1 Bioplus Energy Drink', '2 Pack Sweets', '1 Pop Corn', '1 Custom Card'],
    inStock: true,
  },
];

