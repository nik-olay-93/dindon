import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Video } from './video/video.entity';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: () => process.env.DB_PASSWORD!,
      database: 'postgres',
      entities: [User, Video],
      synchronize: true,
    }),
    UserModule,
    VideoModule,
  ],
})
export class AppModule {}
