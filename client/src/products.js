import { v4 as uuidv4 } from 'uuid';

const products = [
  {
    _id: '1',
    name: 'Airpods Wireless Bluetooth Headphones',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FAirpods%20Wireless%20Bluetooth%20Headphones%2Fairpods.jpg?alt=media&token=82cd2703-8e42-4e10-9325-03b522d2f189',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Wearables',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'iPhone 11 Pro 256GB Memory',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FiPhone%2011%20Pro%20256GB%20Memory%2Fphone.jpg?alt=media&token=a8c05965-b9e0-4a03-87c6-e9ca4b412456',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Phones',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Cannon EOS 80D DSLR Camera',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FCannon%20EOS%2080D%20DSLR%20Camera%2Fcamera.jpg?alt=media&token=88ac98dd-27d6-4b98-9616-780177bbb90c',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Cameras',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    _id: '4',
    name: 'Sony Playstation 4 Pro White Version',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FSony%20Playstation%204%20Pro%20White%20Version%2Fplaystation.jpg?alt=media&token=ac259310-86d1-4b97-8032-7dbfc10f1a03',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Home Entertainment',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    _id: '5',
    name: 'Logitech G-Series Gaming Mouse',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FLogitech%20G-Series%20Gaming%20Mouse%2Fmouse.jpg?alt=media&token=2d049154-e854-4615-91f8-f37834ced940',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Computer Accessories',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: '6',
    name: 'Amazon Echo Dot 3rd Generation',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/brdecomm-c1d32.appspot.com/o/images%2Fproducts%2FAmazon%20Echo%20Dot%203rd%20Generation%2Falexa.jpg?alt=media&token=fc7db3d8-44cc-4085-bc78-7109498c9ff3',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Home Entertainment',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

export const shippingAddresses = [
  {
    id: uuidv4(),
    street: 'unit 1124 555 flinders street',
    suburb: 'cbd',
    postcode: 3000,
    city: 'melbourne',
    country: 'australia',
  },
  {
    id: uuidv4(),
    street: ' unit 2, 224 burwoord highway',
    suburb: 'burwood',
    postcode: 3168,
    city: 'Sydney',
    country: 'australia',
  },
  {
    id: uuidv4(),
    street: 'unit 1118, pelham street',
    suburb: 'carlton',
    postcode: 3054,
    city: 'canberra',
    country: 'australia',
  },
];

export default products;
