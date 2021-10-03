const products = [
  //---- 0
  {
    name: 'Cannon EOS 80D DSLR Camera',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Cameras',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 3,
  },

  //---- 1
  {
    name: 'Nikon Z 5 Mirrorless Camera',
    description:
      "Push the limits of your creativity with the Z 5, an innovative full frame mirrorless camera built around Nikon's revolutionary Z mount. Compact yet powerful, simple yet sophisticated, its ready to grow with you. Whatever your skill level, the Z5 delivers detailed imagery, precision autofocus and the tools you need to be as creative as possible.",
    brand: 'Nikon',
    category: 'Cameras',
    price: 1438.0,
    countInStock: 5,
    rating: 4,
    numReviews: 4,
  },

  //---- 2
  {
    name: 'Sony A6000 Mirrorless Camera',
    description:
      "Freeze fast moving moments and relive the action in glorious detail with Sony's A6000 E-Mount Mirrorless Camera, featuring 0.06 Auto-focus, a BIONZ X processor and 24.3MP APS HD CMOS image sensor. This camera comes with the Sony SELP1650 E PZ 16-50mm F3.5-5.6 OSS E - Mount Zoom Lens",
    brand: 'Sony',
    category: 'Cameras',
    price: 898.0,
    countInStock: 15,
    rating: 4,
    numReviews: 2,
  },

  //---- 3
  {
    name: 'Panasonic LUMIX GH5',
    description:
      'Panasonic LUMIX GH5 Touch Control 4k Splash/Dust/Freezeproof Unrivalled Video And Photo Hybrid Camera, Body Only, Black (DC-GH5GN-K)',
    brand: 'Panasonic',
    category: 'Cameras',
    price: 1438.4,
    countInStock: 35,
    rating: 3,
    numReviews: 5,
  },

  //---- 4
  {
    name: 'GoPro HERO9 Black Camera',
    description:
      'The groundbreaking HERO9 Black sports a beastly 23.6MP sensor for ridiculous 5K video and stunning 20MP photos.',
    brand: 'GoPro',
    category: 'Cameras',
    price: 565.0,
    countInStock: 85,
    rating: 5,
    numReviews: 4,
  },

  //---- 5
  {
    name: 'Sony Playstation 4 Pro White Version',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Home Entertainment',
    price: 399.99,
    countInStock: 11,
    rating: 4,
    numReviews: 2,
  },

  //---- 6
  {
    name: 'Bose Home Speaker 500',
    description:
      'The Bose Home Speaker 500 fills any room with powerful sound. Inside the speaker, two custom drivers point in opposite directions to bounce sound off the walls, creating a soundstage wider than any other smart speaker.',
    brand: 'Bose',
    category: 'Home Entertainment',
    price: 599.99,
    countInStock: 11,
    rating: 3,
    numReviews: 4,
  },

  //---- 7
  {
    name: 'Sony Playstation 5',
    description:
      'The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games. Lightning Speed: Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do',
    brand: 'Sony',
    category: 'Home Entertainment',
    price: 972.0,
    countInStock: 0,
    rating: 5,
    numReviews: 3,
  },

  //---- 8
  {
    name: 'Nintendo Switch Console',
    description:
      'Meet Nintendo Switch Play at home Dock your Nintendo Switch to enjoy HD gaming on your TV. Play anywhere Undock to seamlessly transition into handheld mode. ',
    brand: 'Nintendo',
    category: 'Home Entertainment',
    price: 379.99,
    countInStock: 11,
    rating: 4,
    numReviews: 2,
  },

  //---- 9
  {
    name: 'Xbox Series S',
    description:
      'Introducing the Xbox Series S, the smallest, sleekest Xbox console ever. Experience the speed and performance of a next-gen all-digital console at an accessible price point. Get started with an instant library of 100+ high quality games, including all new Xbox Game Studios titles like Halo Infinite the day they release, when you add Xbox Game Pass Ultimate (membership sold separately)',
    brand: 'Sony',
    category: 'Home Entertainment',
    price: 429.99,
    countInStock: 111,
    rating: 5,
    numReviews: 4,
  },

  //---- 10
  {
    name: 'BenQ 28 inch 4K HDR Gaming Monitor',
    description:
      "EL2870U equipped with brilliant 4K resolution and HDR, EL2870U ensures incredible image delivery of sharpness and details. BenQ's exclusive Brightness Intelligence Plus Technology offers a comfortable viewing experience by adjusting the brightness and color temperature. Additionally, the modern design, high connectivity and fast response will all enhance gaming enjoyment.",
    brand: 'BenQ',
    category: 'Home Entertainment',
    price: 439.0,
    countInStock: 11,
    rating: 4,
    numReviews: 2,
  },

  //---- 11
  {
    name: 'Amazon Echo Dot 3rd Generation',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Home Entertainment',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 3,
  },

  //---- 12
  {
    name: 'Logitech GSeries Gaming Mouse',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Computer Accessories',
    price: 49.99,
    countInStock: 7,
    rating: 2,
    numReviews: 2,
  },

  //---- 13
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Wearables',
    price: 89.99,
    countInStock: 10,
    rating: 4,
    numReviews: 5,
  },

  //---- 14
  {
    name: 'Samsung Galaxy Watch Midnight Black 42mm',
    description:
      "The Galaxy Watch from Samsung is more than just a typical smartwatch, it's a time piece. Choose from multiple elegant style watch faces, one to suit nearly any occasion. In addition to being a fashion accessory, the Galaxy Watch connects to your Android or iOS smartphone via its Bluetooth connection allowing you to receive up to the minute",
    brand: 'Samsung',
    category: 'Wearables',
    price: 259.0,
    countInStock: 57,
    rating: 3,
    numReviews: 3,
  },

  //---- 15
  {
    name: 'Apple Watch Series 6',
    description:
      'The future of health is on your wrist with this Apple Watch Series 6 GPS 40mm in Space Grey. This smart watch includes a new sensor and app to track blood pressure, plus an advanced Retina display. Feature-packed tech to wear every day, for exercise or any occasion.',
    brand: 'Apple',
    category: 'Wearables',
    price: 649.99,
    countInStock: 110,
    rating: 4,
    numReviews: 1,
  },

  //---- 16
  {
    name: 'Garmin Fenix 6 Sapphire Smartwatch',
    description:
      'Add mapping, music, intelligent pace planning and more to your workouts with the fēnix 6 Pro and fēnix 6 Sapphire multisport GPS watches. Designed for all-day wearability, these rugged devices put advanced training status',
    brand: 'Apple',
    category: 'Wearables',
    price: 1189.95,
    countInStock: 37,
    rating: 1,
    numReviews: 1,
  },

  //---- 17
  {
    name: 'Samsung Galaxy s21 128GB',
    description:
      'Miss nothing with Galaxy S21 5G. A camera so good, everyone’s a pro. When capturing your best moments, you no longer have to choose between photo and video. Galaxy S21 captures both simultaneously, so you’re guaranteed to never miss a moment. Capture big screen quality videos in stunning 8K resolution* and zoom in without pixelation with 3x Optical Zoom.',
    brand: 'Samsung',
    category: 'Phones',
    price: 1139.95,
    countInStock: 27,
    rating: 4,
    numReviews: 3,
  },

  //---- 18
  {
    name: 'iPhone 12 Pro 128GB',
    description:
      'Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging',
    brand: 'Apple',
    category: 'Phones',
    price: 1349.95,
    countInStock: 47,
    rating: 3,
    numReviews: 2,
  },

  //---- 19
  {
    name: 'HUAWEI ELS N29 P40 Pro 5G',
    description:
      'Speak for yourself with the Ultra Vision Leica Quad Camera by capturing photos and videos anytime and anywhere you want. Revolutionize your experience of speed and power with the cutting-edge Kirin 990 5G Chipset. The innovative design upgrades your visual entertainment and ergonomic comfort. Explore now and future with HUAWEI P40 Pro.',
    brand: 'Huawei',
    category: 'Phones',
    price: 1088.95,
    countInStock: 27,
    rating: 4,
    numReviews: 2,
  },
];

const doit = (arr) =>
  arr.map(({ name: a }) => a.toLowerCase().split(' ').join('_'));

//console.log(doit(products));

export default products;
