import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment';
import { Post } from 'src/entities/Post';
import { QueryRunner, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createCommon.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { PaginatePostDto } from 'src/post/dto/paginate-post.dto';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/entities/User';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly commonService: CommonService,
  ) {}

  async paginateComments(dto: PaginatePostDto, postId: number) {
    return this.commonService.paginate(
      dto,
      this.commentRepository,
      {
        relations: { author: true },
        where: {
          post: { id: postId },
        },
      },

      `posts/${postId}/comments`,
    );
  }

  async getCommentById(id: number) {
    const commnet = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });

    if (!commnet) {
      throw new BadRequestException(`id : ${id} comment는 존재 하지 않습니다/`);
    }

    return commnet;
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    postId: number,
    author: User,
    qr?: QueryRunner,
  ): Promise<Comment> {
    const repository = this.getRepository(qr);

    return await repository.save({
      ...createCommentDto,
      post: { id: postId },
      author,
    });
  }

  async updateComment(dto: UpdateCommentDto, commentId: number) {
    const comment = await this.commentRepository.preload({
      id: commentId,
      ...dto,
    });

    const newComment = await this.commentRepository.save(comment);

    return newComment;
  }

  async deleteComment(id: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const commnet = await repository.findOne({
      where: { id },
    });

    if (!commnet) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    await repository.delete(id);

    return id;
  }

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Comment>(Comment)
      : this.commentRepository;
  }

  async isCommentMine(userId: number, commentId: number) {
    return this.commentRepository.exist({
      where: {
        id: commentId,
        author: {
          id: userId,
        },
      },
      relations: {
        author: true,
      },
    });
  }
}
