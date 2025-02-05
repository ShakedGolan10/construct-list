// server.ts
import 'dotenv/config';
import fs from 'fs';
import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import http from 'http';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware';
import authRoutes from './api/auth/auth.routes';
import itemsRoutes from './api/items/items.routes';

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

if (process.env.NODE_ENV !== 'production') {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use('/api', authMiddleware as RequestHandler);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);

const serveFrontend: RequestHandler = (req, res) => {
  const htmlFile = path.join(publicPath, 'index.html');
  if (fs.existsSync(htmlFile)) {
    res.sendFile(htmlFile);
  } else {
    res.status(200).json({ message: `Server is live at port ${port}!` });
  }
};
app.get('*', serveFrontend);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

