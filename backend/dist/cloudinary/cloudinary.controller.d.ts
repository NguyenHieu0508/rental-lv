import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private cloudinary;
    constructor(cloudinary: CloudinaryService);
    uploadImages(files: Express.Multer.File[]): Promise<{
        urls: string[];
    }>;
}
