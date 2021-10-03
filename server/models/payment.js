import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    nameOnCard: { type: String, trim: true, default: '' },
    cardNumber: {
      type: Number,
      minLength: 16,
      maxLength: 16,
      required: true,
    },
    expiryMonth: {
      type: String,
      enum: [...Array(12).keys()].map((num) => num + 1),
      minLength: 1,
      maxLength: 2,
      required: true,
    },
    expiryYear: {
      type: String,
      enum: [...Array(7).keys()].map(
        (num) => num + new Date().getFullYear() - 2000
      ),
      minLength: 2,
      maxLength: 2,
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.options.toJSON = {
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

const Payment = mongoose.model('payment', paymentSchema);

export default Payment;
