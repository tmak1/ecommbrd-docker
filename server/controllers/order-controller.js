import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/product.js';

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({})
    .sort({
      updatedAt: -1,
    })
    .exec();
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  let order;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  const orderId = req.params.oid;
  order = await Order.findById(orderId)
    .populate('shippingAddressId', '-userId')
    .populate('paymentMethodId', '-userId')
    .populate('buyerId', '-avatarColor')
    .populate(
      'orderItems.productId',
      '-countInStock -rating -numReviews -reviewIds -description -brand -category'
    );
  if (!order) {
    res.status(404);
    throw new Error('Could not get that order');
  }
  if (order.buyerId._id.toString() !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unauthorized');
  }
  res.json(order);
});

export const getUserOrders = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 2;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  const userIdToLookup = isAdmin ? userId : loggedInUserId;
  const user = await User.findById(userIdToLookup);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  const searchTerm =
    !req.query.orderId ||
    req.query.orderId === 'undefined' ||
    req.query.orderId === undefined
      ? {}
      : {
          _id: req.query.orderId,
        };
  const orderCount = await Order.countDocuments({
    buyerId: user._id,
    ...searchTerm,
  });
  if (!orderCount && orderCount !== 0) {
    res.status(500);
    throw new Error('Could not get user order count');
  }
  const pages = Math.ceil(orderCount / perPage);
  const orders = await Order.find({ buyerId: user._id, ...searchTerm })
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({
      isDelivered: 1,
      updatedAt: -1,
    })
    .exec();
  res.json({ orders, count: orderCount, page, pages, perPage });
});

export const getProductOrders = asyncHandler(async (req, res, next) => {
  const productId = req.params.pid;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 2;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Could not find that product');
  }
  const searchTerm =
    !req.query.orderId ||
    req.query.orderId === 'undefined' ||
    req.query.orderId === undefined
      ? {}
      : {
          _id: req.query.orderId,
        };
  const orderCount = await Order.countDocuments(searchTerm).where(
    'orderItems.productId',
    productId
  );
  if (!orderCount && orderCount !== 0) {
    res.status(500);
    throw new Error('Could not get product order count');
  }
  const pages = Math.ceil(orderCount / perPage);
  const orders = await Order.find(searchTerm)
    .where('orderItems.productId', productId)
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({
      isDelivered: 1,
      updatedAt: -1,
    })
    .exec();
  res.json({ orders, count: orderCount, page, pages, perPage });
});

export const getProductOrderByUser = asyncHandler(async (req, res, next) => {
  let productId = req.params.pid;
  let { loggedInUserId } = req.logedInUserData;
  const order = await Order.findOne({})
    .where('orderItems.productId', productId)
    .where('buyerId', loggedInUserId)
    .select('_id');
  const orderId = order?._id?.toString() || null;
  console.log(orderId);
  res.json(orderId);
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const { loggedInUserId } = req.logedInUserData;
  const {
    shippingAddressId,
    paymentMethodId,
    paymentResult,
    orderItems,
    tax,
    shippingCost,
    total,
    subTotal,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = req.body;

  let order = new Order({
    buyerId: loggedInUserId,
    shippingAddressId,
    paymentMethodId,
    paymentResult,
    orderItems,
    tax: Number(tax),
    shippingCost: Number(shippingCost),
    total: Number(total),
    subTotal: Number(subTotal),
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  });
  order = await order.save();
  if (!order) {
    res.status(500);
    throw new Error('Could not save order');
  }
  res.status(201).json(order);
});

export const updateOrderDelivered = asyncHandler(async (req, res, next) => {
  let order;
  const orderId = req.params.oid;
  order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Could not find order');
  }
  const { isDelivered, deliveredAt } = req.body;
  order.isDelivered = isDelivered;
  order.deliveredAt = deliveredAt;
  order = await order.save();
  if (!order) {
    res.status(500);
    throw new Error('Could not save order');
  }
  res.json({
    id: order.id,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
  });
});
