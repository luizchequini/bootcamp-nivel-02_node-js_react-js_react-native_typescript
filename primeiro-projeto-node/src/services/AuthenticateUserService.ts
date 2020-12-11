import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination');
        }

        // user.password = senha criptografada
        // password = senha digitada pelo usuário

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }
        /**
         * Your Hash: 8dfc7c4ad15319653bb4a7bc6f84fda1
         * Your String: LuizChequiniSouDesenvolvedorFullstack
         */
        const token = sign({}, '8dfc7c4ad15319653bb4a7bc6f84fda1', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
