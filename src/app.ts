import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { notFound, errorHandler } from './middlewares/middlewares';
import routes from './routes';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
