import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, default: 0, enum: [1, 2, 3, 4, 5] },
    comment: { type: String, maxLength: 1000 },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.options.toJSON = {
  transform: (doc, ret) => {
    try {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      // delete ret.updatedAt;
    } catch (error) {
      throw error;
    }
  },
};

const Review = mongoose.model('review', reviewSchema);

export default Review;
