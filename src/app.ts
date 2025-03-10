/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
const allowedOrigins = [
  'http://localhost:3000',
  'https://luxurry-admin-dahsboard.vercel.app',
  'https://luxurrybd.com',
];
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send(
    '<h1> Welcome to the API for the classic luxuryy api new config </h1>',
  );
});

// application routes
app.use('/api/v1', router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
