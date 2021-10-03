import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { hashPassword } from '../shared/utils/bcryptHelper.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: {
      type: String,
      minLength: 3,
      required: true,
      trim: true,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    avatarColor: { type: String, default: '#f50057' },
    billingAddress: {
      street: { type: String, trim: true, default: '02/110 Kings St' },
      suburb: { type: String, trim: true, default: 'Melbourne' },
      postcode: {
        type: Number,
        minLength: 4,
        maxLength: 4,
        default: 3000,
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
        default: 'melbourne',
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
    }
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.options.toJSON = {
  transform: (doc, ret) => {
    try {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.password;
    } catch (error) {
      throw error;
    }
  },
};

const User = mongoose.model('user', userSchema);

export default User;
