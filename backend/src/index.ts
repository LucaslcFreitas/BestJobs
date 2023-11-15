import express, { Request, Response } from 'express';

const server = express();

server.get('/', (req: Request, res: Response) => {
    return res.send('Hello World!');
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('Server is running');
});
