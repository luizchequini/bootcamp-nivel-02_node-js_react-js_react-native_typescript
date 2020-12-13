import multer from 'multer';
import patch from 'path';
import crypto from 'crypto';

const tmpFolder = patch.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(_request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
};
