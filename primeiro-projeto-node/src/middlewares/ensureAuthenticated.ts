import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // Validação do token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, authConfig.jwt.secret);

        console.log(decode);
        return next();
    } catch {
        throw new Error('Invalid JWT token.');
    }
}
