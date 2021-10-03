import colors from 'colors';
import mdbConn from '../shared/db/mongodb.js';
import users from './data/users.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import getSampleProducts from './seedProducts.js';
import Shipping from '../models/shipping.js';
import getSampleShippings from './seedShipping.js';
import Payment from '../models/payment.js';
import getSamplePayments from './seedPayments.js';
import Review from '../models/review.js';
import getSampleReviews from './seedReviews.js';
import Order from '../models/order.js';
import getSampleOrders from './seedOrders.js';

import { printCounts } from './seedHelpers.js';

const clearDb = async (deleteOperation = false) => {
  try {
    const { deletedCount: reviews } = await Review.deleteMany({});
    const { deletedCount: orders } = await Order.deleteMany({});
    const { deletedCount: payments } = await Payment.deleteMany({});
    const { deletedCount: shippings } = await Shipping.deleteMany({});
    const { deletedCount: products } = await Product.deleteMany({});
    const { deletedCount: users } = await User.deleteMany({});
    const deleted = printCounts(
      users,
      products,
      shippings,
      payments,
      reviews,
      orders
    );
    console.log(`Data destroyed!\n${deleted}`.red);
    if (deleteOperation) {
      process.exit(0);
    }
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await clearDb();

    // ----- USERS -------
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers.find((user) => user.isAdmin).id;

    // ----- SHIPPINGS -------
    const sampleShippings = getSampleShippings(createdUsers);
    const createdShippings = await Shipping.insertMany(sampleShippings);

    // ----- PAYMENTS -------
    const samplePayments = getSamplePayments(createdUsers);
    const createdPayments = await Payment.insertMany(samplePayments);

    // ----- PRODUCTS -------
    const sampleProducts = await getSampleProducts(adminUserId);
    const createdProducts = await Product.insertMany(sampleProducts);

    // ----- REVIEWS -------
    const sampleReviews = getSampleReviews(createdProducts, createdUsers);
    const createdReviews = await Review.insertMany(sampleReviews);

    // ----- ORDERS -------
    const sampleOrders = getSampleOrders({
      createdUsers,
      createdProducts,
      createdShippings,
      createdPayments,
      createdReviews,
    });
    const createdOrders = await Order.insertMany(sampleOrders);

    // ----------------------- X ------------------------------

    const inserted = printCounts(
      createdUsers.length,
      createdProducts.length,
      createdShippings.length,
      createdPayments.length,
      createdOrders.length,
      createdReviews.length
    );
    console.log(`Data imported!${inserted}`.green);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

try {
  await mdbConn();
  if (process.argv[0] === '-d') {
    console.log('Deleting..');
    await clearDb(true);
  } else {
    console.log('Deleting/Inserting..');
    await importData();
  }
} catch (error) {
  console.log(error);
}
