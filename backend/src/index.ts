import express from 'express';
import cors from 'cors';
import { routes } from './router/routes';

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('Server is running');
});
