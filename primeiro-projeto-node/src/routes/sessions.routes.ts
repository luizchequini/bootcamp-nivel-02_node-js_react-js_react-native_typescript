import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const AuthenticationUser = new AuthenticateUserService();

        const { user } = await AuthenticationUser.execute({
            email,
            password,
        });
        // delete user.password;
        return response.json({ user });
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default sessionsRouter;