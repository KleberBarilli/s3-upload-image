import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import StorageController from '../controllers/StorageController';

const upload = multer(uploadConfig.multer);
const storageController = new StorageController();

const storageRouter = Router();

storageRouter.post('/image', upload.single('image'), storageController.create);

export default storageRouter;
