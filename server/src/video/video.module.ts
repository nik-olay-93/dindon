import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { VideoController } from './video.controller';
import { Video } from './video.entity';
import { VideoService } from './video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
