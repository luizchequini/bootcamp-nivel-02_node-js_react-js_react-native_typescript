import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../erros/AppError';

interface Request {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ userId, avatarFilename }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(userId);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
