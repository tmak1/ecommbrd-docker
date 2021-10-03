import asyncHandler from 'express-async-handler';

import Shipping from '../models/shipping.js';
import User from '../models/user.js';

export const getUserShippingAddresses = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  if (userId !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const userIdToLookup = isAdmin ? userId : loggedInUserId;
  const user = await User.findById(userIdToLookup);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  const shippingAddresses = await Shipping.find({ userId: user._id })
    .sort({
      updatedAt: -1,
    })
    .exec();
  res.json(shippingAddresses);
});

export const createShippingAddress = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  if (userId !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const userIdToLookup = isAdmin ? userId : loggedInUserId;
  const user = await User.findById(userIdToLookup);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  const { street, suburb, postcode, city, country } = req.body;
  let shippingAddress = new Shipping({
    userId: user._id,
    street,
    suburb,
    postcode: Number(postcode),
    city,
    country,
  });
  shippingAddress = await shippingAddress.save();
  if (!shippingAddress) {
    res.status(500);
    throw new Error('Could not save shipping address');
  }
  res.status(201).json(shippingAddress);
});

export const updateShippingAddress = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const shippingId = req.params.sid;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  if (userId !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const userIdToLookup = isAdmin ? userId : loggedInUserId;
  const user = await User.findById(userIdToLookup);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  let shippingAddress = await Shipping.findById(shippingId);
  if (!shippingAddress) {
    res.status(404);
    throw new Error('Could not find that shipping address');
  }
  if (shippingAddress.userId.toString() !== user._id.toString()) {
    res.status(422);
    throw new Error('That shipping address does not belong to that user');
  }
  const { street, suburb, postcode, city, country } = req.body;
  shippingAddress.street = street || shippingAddress.street;
  shippingAddress.suburb = suburb;
  shippingAddress.postcode = Number(postcode) || shippingAddress.postcode;
  shippingAddress.city = city || shippingAddress.city;
  shippingAddress.country = country || shippingAddress.country;

  shippingAddress = await shippingAddress.save();
  if (!shippingAddress) {
    res.status(500);
    throw new Error('Could not delete shipping address');
  }
  res.json(shippingAddress);
});

export const deleteShippingAddress = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const shippingId = req.params.sid;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  if (userId !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const userIdToLookup = isAdmin ? userId : loggedInUserId;
  const user = await User.findById(userIdToLookup);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  let shippingAddress = await Shipping.findById(shippingId);
  if (!shippingAddress) {
    res.status(404);
    throw new Error('Could not find that shipping address');
  }
  if (shippingAddress.userId.toString() !== user._id.toString()) {
    res.status(422);
    throw new Error('That shipping address does not belong to that user');
  }
  shippingAddress = await shippingAddress.remove();
  if (!shippingAddress) {
    res.status(500);
    throw new Error('Could not delete shipping address');
  }
  res.json(shippingAddress);
});
