import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        qty: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
      },
    ],
    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shipping',
      required: true,
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'payment',
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    tax: { type: Number, required: true, default: 0.0 },
    shippingCost: { type: Number, required: true, default: 0.0 },
    total: { type: Number, required: true, default: 0.0 },
    subTotal: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    paymentResult: {
      payId: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
      amount: { type: Number },
    },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

orderSchema.options.toJSON = {
  transform: (doc, ret) => {
    try {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    } catch (error) {
      throw error;
    }
  },
};

const Order = mongoose.model('order', orderSchema);

export default Order;
