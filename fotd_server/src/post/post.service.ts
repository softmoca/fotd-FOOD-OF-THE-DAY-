import { DEFAULT_POST_FIND_OPTIONS } from './../common/const/default-post-find-option.const';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post';
import {
  FindOptionsWhere,
  LessThan,
  MoreThan,
  QueryRunner,
  Repository,
} from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/update.Post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { HOST, PROTOCOL } from 'src/common/const/env.const';
import { CommonService } from 'src/common/common.service';

import { Image } from 'src/entities/Image';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly commonService: CommonService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getAllPost(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async paginatePosts(dto: PaginatePostDto) {
    return this.commonService.paginate(
      dto,
      this.postRepository,
      { ...DEFAULT_POST_FIND_OPTIONS },
      'post',
    );
  }

  async pagePaginatePosts(dto: PaginatePostDto) {
    const [posts, count] = await this.postRepository.findAndCount({
      skip: dto.take * (dto.page - 1),
      take: dto.take,
      order: {
        createdAt: dto.order__createdAt,
      },
    });

    return this.commonService.paginate(
      dto,
      this.postRepository,
      { relations: ['images'] },
      'post',
    );
  }

  async cursorPaginatePosts(dto: PaginatePostDto) {
    const where: FindOptionsWhere<Post> = {};

    if (dto.where__id__less_than) {
      where.id = LessThan(dto.where__id__less_than);
    } else if (dto.where__id__more_than) {
      where.id = MoreThan(dto.where__id__more_than);
    }
    const posts = await this.postRepository.find({
      where,
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });
    const lastItem =
      posts.length > 0 && posts.length === dto.take
        ? posts[posts.length - 1]
        : null;
    const nextUrl = lastItem && new URL(`${PROTOCOL}://${HOST}/post`);
    if (nextUrl) {
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      }
      let key = null;
      if (dto.order__createdAt === 'ASC') {
        key = 'where__id__more_than';
      } else {
        key = 'where__id__less_than';
      }
      nextUrl.searchParams.append(key, lastItem.id.toString());
    }
    return {
      data: posts,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: posts.length,
      next: nextUrl?.toString() ?? null,
    };
  }

  async getOnePost(id: number, qr?: QueryRunner): Promise<Post> {
    const repository = this.getRepository(qr);

    const post = await repository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async createPost(
    createPostDto: CreatePostDto,
    qr?: QueryRunner,
    userId?: number,
  ) {
    const repository = this.getRepository(qr);

    const post = repository.create({
      author: {
        id: userId,
      },
      ...createPostDto,
      images: [],
    });
    const newPost = await repository.save(post);
    return newPost;
  }

  async isPostMine(userId: number, postId: number) {
    return this.postRepository.exist({
      where: {
        id: postId,
        author: {
          id: userId,
        },
      },
    });
  }

  getRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Post>(Post) : this.postRepository;
  }

  async generatePosts(userId: number) {
    for (let i = 0; i < 30; i++) {
      await this.createPost({
        postContent: `임의로 생성된 포스트 내용 ${i}`,
      });
    }
  }

  async updatePost(id: number, updataPostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getOnePost(id);
    const { postContent } = updataPostDto;

    post.postContent = postContent;

    //post.postImage = postImage;

    return await this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    await this.postRepository.delete(id);
    return post;
  }

  async checkPostExistsById(id: number) {
    return this.postRepository.exist({
      where: {
        id,
      },
    });
  }

  async incrementCommentCount(PostId: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    await repository.increment(
      {
        id: PostId,
      },
      'commentCount',
      1,
    );
  }

  async decrementCommentCount(PostId: number, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    await repository.decrement(
      {
        id: PostId,
      },
      'commentCount',
      1,
    );
  }
}
