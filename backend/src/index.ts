import express from 'express';
import cors from 'cors';
import { routes } from './router/routes';

declare module 'express-serve-static-core' {
    interface Request {
        auth_user_id?: string;
    }
}

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('Server is running');
});
