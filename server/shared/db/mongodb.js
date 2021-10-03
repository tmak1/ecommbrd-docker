import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

const mdbConn = async () => {
  try {
    const url = process.env.MONGODB_URL;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    await mongoose.connect(url, options);
    console.log('Mdb connected'.cyan.underline);
  } catch (error) {
    console.log('Mdb failed'.red.underline.bold);
    throw error;
  }
};

export default mdbConn;
