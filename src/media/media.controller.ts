import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.mediaService.storeFile(file);
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res: Response) {
        try {
        const file = await this.mediaService.getFile(id);
        
        res.set('Content-Type', file.contentType);

        return res.send(file.data);
        } catch (error) {
        throw new NotFoundException('File not found');
        }
    }
}