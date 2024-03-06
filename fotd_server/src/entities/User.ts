import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { IsEmail, Length } from 'class-validator';
import { Post } from './Post';
import { Chats } from './chats.entity';
import { Messages } from './messages.entity';
import { Comment } from './Comment';

@Entity('User', { schema: 'bbc_database' })
export class User extends BaseModel {
  @IsEmail()
  @Length(1, 30)
  @Column('varchar', { name: 'email', length: 30 })
  email: string;

  @Length(1, 30)
  @Column('varchar', { name: 'password', length: 300 })
  password: string;

  @Length(1, 30)
  @Column('varchar', { name: 'nickName', length: 30 })
  nickName: string;

  @Length(1, 30)
  @Column('varchar', { name: 'university', length: 30, nullable: true })
  university: string | null;

  @ManyToMany(() => Chats, (chat) => chat.users)
  @JoinTable()
  chats: Chats[];

  @OneToMany(() => Messages, (message) => message.author)
  messages: Messages[];

  @OneToMany(() => Comment, (comment) => comment.author)
  postComments: Comment[];

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];
}
