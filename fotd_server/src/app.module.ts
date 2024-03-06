import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from './entities/Post';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
import { Image } from './entities/Image';
import { ChatsModule } from './chats/chats.module';
import { Chats } from './entities/chats.entity';
import { Messages } from './entities/messages.entity';
import { Comment } from './entities/Comment';
import { CommentModule } from './post/comment/comment.module';
//test
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.LOCAL_DB_HOST,
      port: 3307,
      username: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_DATABASE,
      entities: [User, Post, Image, Chats, Messages, Comment],
      synchronize: true,
      //logging: true,
      charset: 'utf8mb4',
    }),
    UserModule,
    AuthModule,
    PostModule,
    ChatsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
