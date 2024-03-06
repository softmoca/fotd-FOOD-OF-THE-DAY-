import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { Post } from 'src/entities/Post';

export class CreatePostDto extends PickType(Post, ['postContent']) {
  @IsOptional()
  images?: string[] = [];
}
