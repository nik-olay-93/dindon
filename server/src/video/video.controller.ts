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
import { Request, Response } from 'express';
import fs from 'fs';
import { Video } from './video.entity';
import { VideoService } from './video.service';

export function filterVideo(video: Video) {
  return {
    id: video.id,
    title: video.title,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
    creator: {
      id: video.creator.id,
      username: video.creator.username,
    },
  };
}

@Controller('/video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('/single/:id')
  async getVideo(@Req() request: Request, @Res() res: Response) {
    const video = await this.videoService.findOne(request.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.sendFile(`${process.cwd()}/uploads/${video.name}`);
    return;
  }

  @Get('/watch/:id')
  async watchVideo(@Req() request: Request, @Res() response: Response) {
    const video = await this.videoService.findOne(request.params.id);
    if (!video) {
      response.sendStatus(404);
      return;
    }
    response.send(video);
    return;
  }

  @Get('/explore')
  async getRecent(@Req() req: Request) {
    const limit = +((req.query.c as string) ?? '20');
    const lastD = +(req.query.a as string) || Date.now();
    const result = await this.videoService.findLimited(limit, lastD);
    return result.map((video) => filterVideo(video));
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
      request.body.title,
      request.session.userId,
    );

    return id;
  }
}
