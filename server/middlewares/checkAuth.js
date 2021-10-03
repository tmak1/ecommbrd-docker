import asyncHandler from 'express-async-handler';
import { verifyJWT } from '../shared/utils/jwtHelpers.js';

const checkAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.includes('Bearer ')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(422);
      throw new Error('Malformed token');
    }
    const decoded = await verifyJWT(token);
    req.logedInUserData = {
      loggedInUserId: decoded?.loggedInUserId,
      isAdmin: decoded?.isAdmin,
      token,
    };
    return next();
  }

  res.status(401);
  throw new Error('Unauthenticated');
});

export default checkAuth;
