import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommon.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { PaginatePostDto } from 'src/post/dto/paginate-post.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities/User';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { IsCommentMineGuard } from 'src/auth/guard/is-comment-mine.guard';
import { PostService } from '../post.service';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptors';
import { QueryRunner } from 'src/common/decorators/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

@Controller('/post/:postId/comment')
@UseInterceptors(SuccessInterceptor)
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Get()
  getComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() query: PaginatePostDto,
  ) {
    console.log('sdfsdf');
    return this.commentService.paginateComments(query, postId);
  }

  @Get('/:commentId')
  getCommentById(@Param('commentId') commentId: number) {
    return this.commentService.getCommentById(commentId);
  }

  @UseInterceptors(TransactionInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createPostDto: CreateCommentDto,
    @CurrentUser() user: User,
    @QueryRunner() qr: QR,
  ) {
    const newComment = await this.commentService.createComment(
      createPostDto,
      postId,
      user,
      qr,
    );

    await this.postService.incrementCommentCount(postId, qr);

    return newComment;
  }

  @UseGuards(IsCommentMineGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  async patchComments(
    @Param('cid') cid: number,
    @Body() body: UpdateCommentDto,
  ) {
    const comment = await this.commentService.updateComment(body, cid);

    return comment;
  }

  @UseGuards(IsCommentMineGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @Param('postId') postId: number,
    @CurrentUser() user: User,
    @QueryRunner() qr: QR,
  ) {
    const resp = await this.commentService.deleteComment(commentId, qr);

    await this.postService.decrementCommentCount(postId, qr);

    return resp;
  }
}
