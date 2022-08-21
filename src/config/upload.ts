import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
	driver: 'S3' | 'DISK';
	tmp: string;
	directory: string;
	multer: {
		storage: StorageEngine;
	};
	config: {
		aws: {
			bucket: string;
		};
	};
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
	driver: process.env.STORAGE_DRIVER,
	directory: uploadFolder,
	tmp: tmpFolder,
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex');

				const filename = `${fileHash}-${file.originalname}`;

				callback(null, filename);
			},
		}),
	},
	config: {
		aws: {
			bucket: process.env.AWS_S3_BUCKET_NAME,
		},
	},
} as IUploadConfig;
