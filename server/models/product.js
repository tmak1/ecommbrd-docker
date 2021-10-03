import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 1 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.options.toJSON = {
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

const Product = mongoose.model('product', productSchema);

export default Product;
