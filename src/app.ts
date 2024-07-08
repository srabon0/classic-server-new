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
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    allowedHeaders: [
      'Accept',
      'Accept-Language',
      'Authorization',
      'Cache-Control',
      'Content-Disposition',
      'Content-Encoding',
      'Content-Language',
      'Content-Length',
      'Content-MD5',
      'Content-Range',
      'Content-Type',
      'Date',
      'Host',
      'If-Match',
      'If-Modified-Since',
      'If-None-Match',
      'If-Unmodified-Since',
      'Origin',
      'OriginToken',
      'Pragma',
      'Range',
      'Slug',
      'Transfer-Encoding',
      'Want-Digest',
      'X-MediaBrowser-Token',
      'X-Emby-Token',
      'X-Emby-Client',
      'X-Emby-Client-Version',
      'X-Emby-Device-Id',
      'X-Emby-Device-Name',
      'X-Emby-Authorization',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: '*',
    credentials: true, // If your front-end needs to send cookies to the server
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
