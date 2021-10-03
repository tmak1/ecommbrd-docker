import { getLorem, randomInt } from './seedHelpers.js';

const getSampleReviews = (createdProducts, createdUsers) => {
  const sampleReviews = [
    //--- 0 (3 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[0]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[0]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[0]._id,
      userId: createdUsers[2]._id,
    },
    //--- 1 (4 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[1]._id,
      userId: createdUsers[4]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[1]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[1]._id,
      userId: createdUsers[3]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[1]._id,
      userId: createdUsers[1]._id,
    },
    //--- 2 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[2]._id,
      userId: createdUsers[4]._id,
    },

    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[2]._id,
      userId: createdUsers[5]._id,
    },
    //--- 3 (5 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[3]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[3]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[3]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[3]._id,
      userId: createdUsers[4]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[3]._id,
      userId: createdUsers[5]._id,
    },
    //--- 4 (4 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[4]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[4]._id,
      userId: createdUsers[4]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[4]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[4]._id,
      userId: createdUsers[3]._id,
    },
    //--- 5 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[5]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[5]._id,
      userId: createdUsers[2]._id,
    },
    //--- 6 (4 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[6]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[6]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[6]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[6]._id,
      userId: createdUsers[4]._id,
    },
    //--- 7 (3 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[7]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[7]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[7]._id,
      userId: createdUsers[2]._id,
    },
    //--- 8 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[8]._id,
      userId: createdUsers[3]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[8]._id,
      userId: createdUsers[0]._id,
    },
    //--- 9 (4 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[9]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[9]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[9]._id,
      userId: createdUsers[3]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[9]._id,
      userId: createdUsers[5]._id,
    },
    //--- 10 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[10]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[10]._id,
      userId: createdUsers[1]._id,
    },
    //--- 11 (3 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[11]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[11]._id,
      userId: createdUsers[3]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[11]._id,
      userId: createdUsers[2]._id,
    },
    //--- 12 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[12]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[12]._id,
      userId: createdUsers[1]._id,
    },
    //--- 13 (5 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[13]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[13]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[13]._id,
      userId: createdUsers[3]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[13]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[13]._id,
      userId: createdUsers[1]._id,
    },
    //--- 14 (3 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[14]._id,
      userId: createdUsers[0]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[14]._id,
      userId: createdUsers[2]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[14]._id,
      userId: createdUsers[5]._id,
    },
    //--- 15 (1 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[15]._id,
      userId: createdUsers[0]._id,
    },
    //--- 16 (1 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[16]._id,
      userId: createdUsers[2]._id,
    },
    //--- 17 (3 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[17]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[17]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[17]._id,
      userId: createdUsers[2]._id,
    },
    //--- 18 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[18]._id,
      userId: createdUsers[1]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[18]._id,
      userId: createdUsers[2]._id,
    },
    //--- 19 (2 rev)
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[19]._id,
      userId: createdUsers[5]._id,
    },
    {
      rating: randomInt(5, 1),
      comment: getLorem(),
      productId: createdProducts[19]._id,
      userId: createdUsers[3]._id,
    },
  ];
  return sampleReviews;
};

export default getSampleReviews;
