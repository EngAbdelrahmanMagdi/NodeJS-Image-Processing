import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routers/images';

dotenv.config();

const server: Application = express();

const SERVER_PORT = (process.env.SERVER_PORT as unknown as number) || 8000;

//Morgan package for getting responses

server.use(morgan('dev'));

//Main URL

server.get('/', (request: Request, response: Response): void => {
  response.send(
    `<h2> Welcome to Abdelrahman's Application  </h2>
        <p>Use route /api/images?imagename=(image name)</p>
        <p>Example: http://localhost:${SERVER_PORT}/api/images?imagename=fjord&width=500&height=500</p>

        `
  );
});
//Routes

server.use('/api/images',routes);

//Server Listening

//404 Error for NOT FOUND Middleware
server.use((request: Request, response: Response): void => {
  response.status(404).json({ Message: '404 NOT FOUND' });
});

//500 ERROR FOR Error Middleware

server.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: Function
  ): void => {
    response.status(500).json({ Errors: error.stack });
  }
);

server.listen(SERVER_PORT, (): void => {
  console.log(`Server runs well! on port ${SERVER_PORT}`);
});

export default server;
