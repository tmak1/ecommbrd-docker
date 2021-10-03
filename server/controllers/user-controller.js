import asyncHandler from 'express-async-handler';
import randomMC from 'random-material-color';

import User from '../models/user.js';
import { genJWT } from '../shared/utils/jwtHelpers.js';
import { verifyPassword } from '../shared/utils/bcryptHelper.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
  let users = [];
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 3;
  const searchTerm =
    !req.query.userId ||
    req.query.userId === 'undefined' ||
    req.query.userId === undefined
      ? {}
      : {
          _id: req.query.userId,
        };
  const userCount = await User.countDocuments(searchTerm);
  if (!userCount && userCount !== 0) {
    res.status(500);
    throw new Error('Could not get user count');
  }
  const pages = Math.ceil(userCount / perPage);
  // users = await User.aggregate([
  //   { $match: searchTerm },
  //   { $limit: perPage },
  //   { $skip: perPage * (page - 1) },
  //   { $sort: { isAdmin: -1, updatedAt: -1 } },
  //   { $addFields: { id: '$_id' } },
  //   {
  //     $project: {
  //       _id: 0,
  //     },
  //   },
  // ]).exec();
  users = await User.find(searchTerm)
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({
      isAdmin: -1,
      updatedAt: -1,
    })
    .exec();
  res.json({ users, count: userCount, page, pages, perPage });
});

export const getUserById = asyncHandler(async (req, res, next) => {
  let user;
  const userId = req.params.uid;
  user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Could not find that user');
  }
  res.json(user);
});

export const signup = asyncHandler(async (req, res, next) => {
  let user;
  const { name, email, password, isAdmin } = req.body;
  user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('That email is already registered');
  }
  const avatarColor = randomMC.getColor();
  user = new User({ name, email, password, isAdmin, avatarColor });
  user = await user.save();
  const token = await genJWT(user);
  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  let user;
  const { email, password } = req.body;
  user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Incorrect email / password');
  }
  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Incorrect email / password');
  }
  const token = await genJWT(user);
  res.json({ user, token });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  let user;
  const userId = req.params.uid;
  const { loggedInUserId, isAdmin } = req.logedInUserData;
  if (userId !== loggedInUserId && !isAdmin) {
    res.status(403);
    throw new Error('Unathorized');
  }
  user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('That email is not registered');
  }
  const { name, email, password } = req.body;
  if (email !== user.email) {
    res.status(403);
    throw new Error('Not allowed to change email address');
  }
  user.name = name || user.name;
  if (!password || password?.trim().length === '') {
    user = await user.save();
    return res.status(200).json({ user, passwordNotModified: true });
  }
  let passwordNotModified = true;
  passwordNotModified = await verifyPassword(password, user.password);
  if (!passwordNotModified) {
    user.password = password;
  }
  user = await user.save();
  res.status(200).json({ user, passwordNotModified });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  let user;
  const userId = req.params.uid;
  user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('That email is not registered');
  }
  user = await user.remove();
  res.status(200).json(user);
});
