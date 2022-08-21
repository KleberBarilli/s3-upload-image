import { Request, Response } from 'express';
import StorageService from '../services/StorageService';
import { container } from 'tsyringe';

export default class StorageController {
	public async create(req: Request, res: Response): Promise<Response> {
		const createImage = container.resolve(StorageService);

		try {
			const image = await createImage.execute({
				filename: req.file?.filename as string,
			});
			delete image.Body;
			return res.json({ data: image });
		} catch (error) {
			return res.json({ error });
		}
	}
}
