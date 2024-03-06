import { Column, Entity, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { BaseModel } from './base.entity';
import { IsNumber, IsString, Length } from 'class-validator';
import { User } from './User';

@Entity('Comment', { schema: 'bbc_database' })
export class Comment extends BaseModel {
  @ManyToOne(() => User, (user) => user.postComments, { eager: true })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  post: Post;

  @Length(1, 100)
  @IsString()
  @Column('varchar', { name: 'comment', length: 100 })
  commentContent: string;

  @IsNumber()
  @Column('int', { name: 'commentLike', default: 0 })
  commentLike: number;
}
