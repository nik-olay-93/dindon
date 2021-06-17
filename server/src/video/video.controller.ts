import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response, response } from 'express';
import fs from 'fs';
import { Video } from './video.entity';
import { VideoService } from './video.service';

@Controller('/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('/:id')
  async getVideo(@Req() request: Request, @Res() res: Response) {
    const video = await this.videoService.findOne(request.body.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.sendFile(`${process.cwd()}/uploads/${video.name}`);
    return;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<string | undefined> {
    if (!file.mimetype.includes('video') || !request.session.userId) {
      fs.unlinkSync(file.path);
      return undefined;
    }

    const id = await this.videoService.createVideo(
      file,
      request.session.userId,
    );

    return id;
  }
}
