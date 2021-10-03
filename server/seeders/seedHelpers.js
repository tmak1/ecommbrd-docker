import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';

import { loremIpsum } from 'lorem-ipsum';

import { bucket } from '../shared/utils/firebase-config.js';

export const getFileMetaData = (productName) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fileName =
    productName
      .trim()
      .split(/\s+/)
      .map((str) => str.toLowerCase())
      .join('_') + '.jpg';
  const localFilePath = path.resolve(
    __dirname,
    '..',
    'public',
    process.env.NODE_ENV,
    'images',
    `${fileName}`
  );
  const remoteFilePath = `${process.env.NODE_ENV}/products/images/${fileName}`;
  return { localFilePath, remoteFilePath };
};

export const bucketUpload = async (localFilePath, remoteFilePath) => {
  return await bucket.upload(localFilePath, {
    destination: remoteFilePath,
    predefinedAcl: 'publicRead',
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
};

export const firebaseUpload = async (localFilePath, remoteFilePath) => {
  try {
    const res = await bucketUpload(localFilePath, remoteFilePath);
    const metaRes = await res[0].getMetadata();
    const mediaLink = metaRes[0].mediaLink;
    if (!mediaLink) {
      throw 'Could not get download urls';
    }
    return mediaLink;
  } catch (error) {
    throw error;
  }
};

export const printCounts = (
  users,
  products,
  shippings,
  payments,
  orders,
  reviews
) => {
  return JSON.stringify(
    {
      count: {
        users,
        products,
        shippings,
        payments,
        orders,
        reviews,
      },
    },
    null,
    2
  );
};

export const getLorem = () => {
  return loremIpsum({
    count: randomInt(6, 3),
    units: 'sentences',
  });
};

export const randomInt = (max, min) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const randomObjectId = () => {
  return mongoose.Types.ObjectId();
};

export const randomString = (length) => {
  let result = '';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
