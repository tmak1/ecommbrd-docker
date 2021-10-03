import { randomObjectId, randomString } from './seedHelpers.js';

const createOrder = ({ user, product, shipping, payment }) => {
  // console.log('user ', user);
  // console.log('product ', product);
  // console.log('shipping ', shipping);
  // console.log('payment ', payment);

  const taxPercent = 10;
  const tax = product.price + product.price * (taxPercent / 100);
  const shippingCost = 25;
  const total = product.price;
  const subTotal = tax + total + shippingCost;
  const order = {
    tax,
    shippingCost,
    total,
    subTotal,
    isPaid: true,
    isDelivered: false,
    paidAt: new Date().toISOString(),
    deliveredAt: null,
    buyerId: user._id,
    shippingAddressId: shipping._id,
    paymentMethodId: payment._id,
    paymentResult: {
      payId: randomString(17),
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: 'sb-3tyyd6190367@personal.example.com',
      amount: subTotal,
    },
    orderItems: [
      {
        _id: randomObjectId(),
        qty: 1,
        productId: product._id,
      },
    ],
  };
  return order;
};

const getSampleOrders = ({
  createdUsers,
  createdProducts,
  createdShippings,
  createdPayments,
  createdReviews,
}) => {
  const sampleOrders = createdReviews.map((review) => {
    const user = createdUsers.find((user) => user._id === review.userId);
    const product = createdProducts.find(
      (product) => product._id === review.productId
    );
    const shipping = createdShippings.find(
      (shipping) => shipping.userId.toString() === review.userId.toString()
    );

    const payment = createdPayments.find(
      (payment) => payment.userId.toString() === review.userId.toString()
    );
    const order = createOrder({ user, product, shipping, payment });
    return order;
  });
  return sampleOrders;
};

export default getSampleOrders;
