import { Image } from 'src/entities/Image';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { User } from './User';
import { Comment } from './Comment';

@Entity('Post', { schema: 'bbc_database' })
export class Post extends BaseModel {
  @Length(1, 200)
  @Column({ nullable: true })
  postContent: string;

  @IsNumber()
  @Column('int', { name: 'postLike', default: 0, nullable: true })
  postLike: number;

  @IsString()
  @OneToMany((type) => Image, (image) => image.post, { cascade: true })
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  author: User;

  @Column({ default: 0 })
  commentCount: number;
}
