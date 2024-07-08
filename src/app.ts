/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
const allowedOrigins = [
  'https://luxurry-admin-dahsboard.vercel.app/',
  'http://localhost:3000',
];

const corsOptions: CorsOptionsDelegate<CorsRequest> = (req, callback) => {
  let corsOptions: CorsOptions;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string) || !origin) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptions));

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
