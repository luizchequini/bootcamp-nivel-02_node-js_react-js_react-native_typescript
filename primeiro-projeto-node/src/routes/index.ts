import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
    response.json({ message: 'Hellow Luiz Chequini ;)' }),
);

export default routes;
