import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/users', userRouter);
app.use('/tour', tourRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}...`);
    });
    console.log('MongoDB successfully connected!')
  })
  .catch((err) => {
    console.log('Error connecting MongoDB!', err);
  });
