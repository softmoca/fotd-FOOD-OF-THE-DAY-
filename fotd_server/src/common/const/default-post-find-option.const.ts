import { Post } from 'src/entities/Post';
import { FindManyOptions } from 'typeorm';

export const DEFAULT_POST_FIND_OPTIONS: FindManyOptions<Post> = {
  relations: {
    images: true,
    author: true,
    comments: true,
  },
};
