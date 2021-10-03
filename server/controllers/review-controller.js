import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Review from '../models/review.js';
import Product from '../models/product.js';

export const getAllProductReviews = asyncHandler(async (req, res, next) => {
  const productId = req.params.pid;
  const reviews = await Review.find({ productId })
    .populate('userId', 'name email avatarColor')
    .sort({ updatedAt: 'desc' });
  res.json(reviews);
});

export const getAllUserReviews = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const reviews = await Review.find({ userId })
    .populate('productId', '-description -countInStock -creatorId')
    .populate('userId', 'name email avatarColor');
  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res, next) => {
  let review;
  const productId = req.params.pid;
  const { loggedInUserId: userId } = req.logedInUserData;
  const { rating, comment } = req.body;
  const existingReview = await Review.findOne({ productId, userId });
  if (existingReview) {
    existingReview.rating = Number(rating) || existingReview.rating;
    existingReview.comment = comment;
    review = await existingReview.save();
  } else {
    review = new Review({
      rating: Number(rating),
      comment,
      productId,
      userId,
    });
    const product = await Product.findById(productId);
    const session = await mongoose.startSession();
    session.startTransaction();
    review = await review.save({ session });
    product.numReviews = product.numReviews + 1;
    await product.save({ session });
    await session.commitTransaction();
  }
  if (!review) {
    res.status(500);
    throw new Error('Could not save review');
  }
  res.status(201).json(review);
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  let review;
  const reviewId = req.params.rid;
  review = await Review.findById(reviewId).populate('productId');
  if (!review) {
    res.status(404);
    throw new Error('Could not find that review');
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  review = await review.remove({ session });
  const product = review.productId;
  product.numReviews = product.numReviews - 1;
  await product.save({ session });
  await session.commitTransaction();
  if (!review) {
    res.status(500);
    throw new Error('Could not delete review');
  }
  res.json(review);
});
