import express, {Router, Request, Response} from 'express';

const routes:Router = express.Router(); 

routes.get('/', (request:Request, response:Response):void=>{
    response.status(200).send('Routes work well!');
});

export default routes; 