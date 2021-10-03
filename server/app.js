import colors from 'colors';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import mdbConn from './shared/db/mongodb.js';
import userRouter from './routes/user-routes.js';
import productRouter from './routes/product-routes.js';
import shippingRouter from './routes/shipping-routes.js';
import paymentRouter from './routes/payment-routes.js';
import orderRouter from './routes/order-routes.js';
import reviewRouter from './routes/review-routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config({ path: '.env' });

const app = express();
if (process.env.NODE_ENV === 'development') {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const accessLogStream = fs.createWriteStream(
    path.resolve(__dirname, 'logs', 'access.log'),
    {
      flags: 'a',
    }
  );
  app.use(morgan('dev', { stream: accessLogStream }));
}
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRouter);
app.use(errorHandler);

try {
  await mdbConn();
  const port = process.env.PORT;
  const host = process.env.HOST;
  app.listen({ port }, (error) => {
    if (error) {
      console.log('Server connect failed'.red.underline.bold);
      throw error;
    }
    console.log(`Listening on ${host}:${port}`.cyan.underline);
  });
} catch (error) {
  console.log(`${error}`.red.underline.bold);
}
