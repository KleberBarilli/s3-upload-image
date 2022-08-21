import { injectable } from 'tsyringe';
import S3StorageProvider, {
	IPutObject,
} from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
	filename: string;
}
@injectable()
export default class StorageService {
	public async execute({ filename }: IRequest): Promise<IPutObject> {
		const storageProvider = new S3StorageProvider();

		return await storageProvider.saveFile(filename);
	}
}
