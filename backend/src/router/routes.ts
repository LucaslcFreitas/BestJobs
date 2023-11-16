import { Router } from 'express';

const routes = Router();

//TEMP
routes.get('/', (req, res) => {
    return res.send('Server is running');
});

export { routes };
