import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Session,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Video } from './video.entity';
import { VideoService } from './video.service';

@Controller('/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('/:id')
  async getVideo(@Req() request: Request): Promise<Video | undefined> {
    return await this.videoService.findOne(request.params.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    if (!file.mimetype.includes('video')) {
      return undefined;
    }

    if (!request.session.userId) {
      return undefined;
    }

    const id = await this.videoService.createVideo(
      file,
      request.session.userId,
    );
  }
}
