import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class CloudinaryController {
    constructor(private cloudinary: CloudinaryService) { }

    @Post('images')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
        const results = await Promise.all(
            files.map((file) => this.cloudinary.uploadImage(file))
        );

        return { urls: results.map((r) => r.secure_url) };
    }
}
