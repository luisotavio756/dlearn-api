import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import routes from './app/routes';

import './app/config/database';
import upload from './app/config/upload';

const app = express();

app.use(cors());
app.use('/files', express.static(upload.uploadsFolder));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started !');
});
