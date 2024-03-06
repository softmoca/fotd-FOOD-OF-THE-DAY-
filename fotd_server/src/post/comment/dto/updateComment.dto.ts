import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './createCommon.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
