import asyncHandler from 'express-async-handler';

import Payment from '../models/payment.js';
import User from '../models/user.js';

export const getUserPaymentMethods = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const { loggedInUserId } = req.logedInUserData;
  if (userId !== loggedInUserId) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  const paymentMethods = await Payment.find({ userId: user._id });
  res.json(paymentMethods);
});

export const createPaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const { loggedInUserId } = req.logedInUserData;
  if (userId !== loggedInUserId) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  const { nameOnCard, cardNumber, expiryMonth, expiryYear } = req.body;
  const existingCardNumber = await Payment.findOne({ cardNumber });
  if (existingCardNumber) {
    res.status(422);
    throw new Error('That card is already added');
  }
  let paymentMethod = new Payment({
    userId: user._id,
    nameOnCard,
    cardNumber: Number(cardNumber),
    expiryMonth,
    expiryYear,
  });
  paymentMethod = await paymentMethod.save();
  if (!paymentMethod) {
    res.status(500);
    throw new Error('Could not save payment method');
  }
  res.status(201).json(paymentMethod);
});

export const deletePaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const paymentId = req.params.payid;
  const { loggedInUserId } = req.logedInUserData;
  if (userId !== loggedInUserId) {
    res.status(403);
    throw new Error('Unathorized');
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  let paymentMethod = await Payment.findById(paymentId);
  if (!paymentMethod) {
    res.status(404);
    throw new Error('Could not find that payment method');
  }
  if (paymentMethod.userId.toString() !== user._id.toString()) {
    res.status(422);
    throw new Error('That payment method does not belong to that user');
  }
  paymentMethod = await paymentMethod.remove();
  if (!paymentMethod) {
    res.status(500);
    throw new Error('Could not delete payment method');
  }
  res.json(paymentMethod);
});
