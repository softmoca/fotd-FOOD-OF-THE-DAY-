import { Image } from './../../entities/Image';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { promises } from 'fs';
import { join, basename } from 'path';

import { CreatePostImageDto } from './dto/create-image.dto';

import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from 'src/common/const/path.const';

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  // 1) get file metadata using file name
  // 2) move file to new location from temp folder
  // 3) save entity
  async createPostImage(createImageDto: CreatePostImageDto, qr?: QueryRunner) {
    const repository = this.getImageModelRepository(qr);

    const tempFilePath = join(TEMP_FOLDER_PATH, createImageDto.path);

    try {
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 이미지입니다.');
    }

    const fileName = basename(tempFilePath);

    const newPath = join(POST_IMAGE_PATH, fileName);

    const result = await repository.save({
      ...createImageDto,
    });

    // 파일 post_image 폴더로 이동시키기
    await promises.rename(tempFilePath, newPath);

    return result;
  }

  private getImageModelRepository(qr?: QueryRunner) {
    return !!qr ? qr.manager.getRepository(Image) : this.imageRepository;
  }
}
