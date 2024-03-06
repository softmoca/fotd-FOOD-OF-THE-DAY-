import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Comment } from 'src/entities/Comment';
import { Image } from 'src/entities/Image';
import { Post } from 'src/entities/Post';
import { PostModule } from 'src/post/post.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostService } from 'src/post/post.service';
import { PostExistsMiddleware } from 'src/common/middlewares/post-exist.middlewares';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, Image]),
    CommonModule,
    PostModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, PostService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostExistsMiddleware).forRoutes(CommentController);
  }
}
