import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const server: Application = express();

const SERVER_PORT = (process.env.SERVER_PORT as unknown as number) || 8000;

server.listen(SERVER_PORT, (): void => {
  console.log(`Server runs well! on port ${SERVER_PORT}`);
});

server.use(morgan('dev'));

export default server;
