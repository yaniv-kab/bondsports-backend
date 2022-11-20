import mongoose from 'mongoose';
import app from './app';
import logger from './utils/logger';
import { seedPersons } from './seeds/persons';

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bondsports';


mongoose.connect(MONGO_URI).then(() => {
  logger.info('connected to mongoDB');
  app.listen(port, () => {
    /* eslint-disable no-console */
    logger.info(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
  setTimeout(() => {
    seedPersons();
  }, 2000);
});