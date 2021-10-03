import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    street: { type: String, trim: true, required: true },
    suburb: { type: String, trim: true, default: '' },
    postcode: {
      type: Number,
      minLength: 4,
      maxLength: 4,
      required: true,
      default: '',
    },
    city: {
      type: String,
      enum: [
        'melbourne',
        'sydney',
        'adelaide',
        'perth',
        'darwin',
        'canberra',
        'alice springs',
      ],
      required: true,
    },
    country: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

shippingSchema.options.toJSON = {
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

const Shipping = mongoose.model('shipping', shippingSchema);

export default Shipping;
