import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto {
  @MinLength(1)
  @MaxLength(200)
  @IsNotEmpty()
  postContent: string;

  postImage: string;
}
