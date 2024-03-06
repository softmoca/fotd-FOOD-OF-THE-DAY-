import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post';
import { CommonModule } from 'src/common/common.module';
import { Image } from 'src/entities/Image';
import { PostImageService } from './image/image.service';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image]), CommonModule],
  controllers: [PostController],
  providers: [PostService, PostImageService],
  exports: [PostService],
})
export class PostModule {}
