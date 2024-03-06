import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/update.Post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageModelType } from 'src/entities/Image';
import { PostImageService } from './image/image.service';

import { DataSource, QueryRunner as QR } from 'typeorm';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptors';
import { QueryRunner } from 'src/common/decorators/query-runner.decorator';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities/User';
import { IsPostMineGuard } from 'src/auth/guard/is-post-mine.guard';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private readonly postImageService: PostImageService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllPost(@Query() query: PaginatePostDto) {
    return this.postService.paginatePosts(query);
  }

  @Get(':id')
  getOnePost(@Param('id') id: number) {
    return this.postService.getOnePost(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
    @QueryRunner() qr: QR,
  ) {
    const userId = user.id;
    // console.log(userId);
    const post = await this.postService.createPost(createPostDto, qr, userId);

    for (let i = 0; i < createPostDto.images.length; i++) {
      await this.postImageService.createPostImage(
        {
          post,
          path: createPostDto.images[i],
          order: i,
          type: ImageModelType.postImage,
        },
        qr,
      );
    }

    return this.postService.getOnePost(post.id, qr);
  }

  @Post('random')
  @UseGuards(JwtAuthGuard)
  async postPostsRandom(@CurrentUser() user: User) {
    const userId = user.id;
    await this.postService.generatePosts(userId);

    return true;
  }

  @UseGuards(IsPostMineGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':postId')
  async updatePost(
    @Param('postId') id: number,
    @Body() updataPostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    const ee = await this.postService.isPostMine(userId, id);

    console.log(ee);
    return await this.postService.updatePost(id, updataPostDto);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') id: number) {
    return await this.postService.deletePost(id);
  }
}
