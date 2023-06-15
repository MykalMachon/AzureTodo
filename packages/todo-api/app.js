import express from 'express';
import cookieParser from 'cookie-parser';
import PinoHttp from 'pino-http';

import routes from './routes/index.js';
import authMiddleware from './middleware/auth.js';

const app = express();

app.use(PinoHttp());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// setup authentication middleware
app.use(authMiddleware);
app.use('/api', routes);

export default app;