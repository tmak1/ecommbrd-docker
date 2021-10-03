import jwt from 'jsonwebtoken';

const genJwtPromise = (user) => {
  try {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { loggedInUserId: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (error, token) => {
          if (!token) return reject(error);
          return resolve(token);
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

export const genJWT = async (user) => {
  try {
    const token = await genJwtPromise(user);
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyJwtPromise = (token) => {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) return reject(error);
        return resolve(decoded);
      });
    });
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async (token) => {
  try {
    const decoded = await verifyJwtPromise(token);
    return decoded;
  } catch (error) {
    throw error;
  }
};
