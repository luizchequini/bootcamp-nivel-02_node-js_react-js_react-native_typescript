import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../erros/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const AuthenticationUser = new AuthenticateUserService();

        const { user, token } = await AuthenticationUser.execute({
            email,
            password,
        });
        // delete user.password;
        return response.json({ user, token });
    } catch (e) {
        return response.status(e.statusCode).json({ error: e.message });
    }
});

export default sessionsRouter;
