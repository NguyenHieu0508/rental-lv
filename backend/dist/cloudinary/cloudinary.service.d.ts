import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    private cloudinary;
    constructor(cloudinary: any);
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
