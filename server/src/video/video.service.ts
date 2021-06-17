import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    private userService: UserService,
  ) {}

  async findOne(id: string): Promise<Video | undefined> {
    try {
      return await this.videoRepository.findOne(id);
    } catch (e) {
      return undefined;
    }
  }

  async createVideo(file: Express.Multer.File, creatorId: string) {
    try {
      const user = await this.userService.findOne(creatorId);
      const video = this.videoRepository.create({
        name: file.filename,
        creator: user,
      });
      await this.videoRepository.save(video);

      return video.id;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}
