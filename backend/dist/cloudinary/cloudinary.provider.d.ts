import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
export declare const CloudinaryProvider: {
    provide: string;
    useFactory: (config: ConfigService) => typeof cloudinary;
    inject: (typeof ConfigService)[];
};
