import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/product.js';
import User from '../models/user.js';

export const getAllProducts = asyncHandler(async (req, res, next) => {
  let products = [];

  const searchTerm =
    !req.query.search ||
    req.query.search === 'undefined' ||
    req.query.search === undefined
      ? {}
      : {
          name: {
            $regex: req.query.search,
            $options: 'i',
          },
        };

  const ratingQuery =
    !req.query.rating ||
    req.query.rating === 'undefined' ||
    req.query.rating === undefined
      ? {}
      : {
          rating: { $gte: Number(req.query.rating) },
        };

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 2;

  const filterQuery =
    req.query.filters.length === 0
      ? {}
      : {
          category: {
            $in: req.query.filters?.split(','),
          },
        };

  const sortBy =
    req.query.sort.length === 0
      ? {}
      : {
          [req.query.sort?.split('|')[0]]:
            req.query.sort?.split('|')[1] === 'DESC' ? -1 : 1,
        };
  const numReviewsSort =
    req.query.sort?.split('|')[0] === 'rating' ? { numReviews: -1 } : {};
  const sortByQuery = { ...sortBy, ...numReviewsSort };

  const query = { ...searchTerm, ...filterQuery, ...ratingQuery };

  const productCount = await Product.countDocuments(query);
  if (!productCount && productCount !== 0) {
    res.status(500);
    throw new Error('Could not get product count');
  }
  const pages = Math.ceil(productCount / perPage);
  products = await Product.find(query)
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sortByQuery);

  res.json({ products, page, pages, perPage });
});

export const getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  if (!products) {
    res.status(404);
    throw new Error('Could not find top products');
  }
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res, next) => {
  let product;
  const productId = req.params.pid;
  product = await Product.findById(productId).populate('creatorId');
  if (!product) {
    res.status(404);
    throw new Error('Could not get that product');
  }
  res.json(product);
});

export const getAdminProducts = asyncHandler(async (req, res, next) => {
  let user;
  let products;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 2;
  const userId = req.params.uid;

  user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Could not find the creator of that product');
  }
  const searchTerm =
    !req.query.productId ||
    req.query.productId === 'undefined' ||
    req.query.productId === undefined
      ? {}
      : {
          _id: req.query.productId,
        };
  const productCount = await Product.countDocuments({
    creatorId: user.id,
    ...searchTerm,
  });
  if (!productCount && productCount !== 0) {
    res.status(500);
    throw new Error('Could not get product count');
  }
  const pages = Math.ceil(productCount / perPage);
  products = await Product.find({ creatorId: user.id, ...searchTerm })
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({ name: 1, updatedAt: -1 })
    .exec();

  res.json({ products, count: productCount, page, pages, perPage });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  let product;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  const { name, price, countInStock, imageUrl, description, category, brand } =
    req.body;
  product = await Product.findOne({ name, brand });
  if (product) {
    res.status(400);
    throw new Error('That product already exists');
  }
  product = new Product({
    name: name || 'Placeholder name',
    price: Number(price) || 0,
    countInStock: Number(countInStock) || 0,
    imageUrl: imageUrl || '/images/placeholder.jpg',
    description: description || 'Placeholder description',
    category,
    brand: brand || 'Placeholder brand',
    rating: 1,
    numReviews: 0,
    creatorId: mongoose.Types.ObjectId(loggedInUserId),
  });
  product = await product.save();
  res.status(201).json({ product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  let product;
  const productId = req.params.pid;
  product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Could not find product');
  }
  const { name, price, countInStock, imageUrl, description, category, brand } =
    req.body;
  product.name = name || product.name;
  product.price = Number(price) || product.price;
  product.countInStock = Number(countInStock) || product.countInStock;
  product.imageUrl = imageUrl || product.imageUrl;
  product.description = description || product.description;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product = await product.save();
  res.status(200).json({ product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  let product;
  const productId = req.params.pid;
  product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Could not find product');
  }
  product = await product.remove();
  res.status(200).json(product);
});
