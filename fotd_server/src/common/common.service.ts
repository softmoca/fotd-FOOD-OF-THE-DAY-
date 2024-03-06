import { BadRequestException, Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseModel } from 'src/entities/base.entity';
import { FILTER_MAPPER } from './const/filter-mapper.onst';
import { HOST, PROTOCOL } from './const/env.const';

@Injectable()
export class CommonService {
  async paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    // find option 중 강제로 덮어쓰고 싶은 데이터 넣는 곳
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(
        dto,
        repository,
        // find option 중 강제로 덮어쓰고 싶은 데이터 넣는 곳
        overrideFindOptions,
      );
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {
    const findOptions = this.composeFindOptions<T>(dto);

    const [posts, count] = await repository.findAndCount({
      ...findOptions,
      ...overrideFindOptions,
    });

    return {
      data: posts,
      total: count,
    };
  }

  async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,

    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    const findOptions = this.composeFindOptions<T>(dto);

    const results = await repository.find({
      ...findOptions,
      ...overrideFindOptions,
    });

    // 실제 반환된 페이지네이션 데이터 Data[];
    const data = results;
    // 마지막 데이터
    const lastItem =
      data.length > 0 && data.length === findOptions.take
        ? data[data.length - 1]
        : null;

    // 다음 커서 생성하기
    const nextUrl = lastItem && new URL(`${PROTOCOL}://${HOST}/${path}`);

    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 벨류가 존재하면
       * param에 그대로 붙여넣는다.
       *
       * 단, where__id_more_than 값만 lastItem의 마지막 값으로 넣어준다.
       */
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
      data,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: data.length,
      next: nextUrl?.toString() ?? null,
    };
  }

  composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};
    for (const [key, value] of Object.entries(dto)) {
      // where__로 시작하면 where 필터를 파싱한다.
      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        // order__로 시작하면 order 필터를 파싱한다.
        order = {
          ...order,
          ...this.parseWhereFilter(key, value),
        };
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: string,
  ): FindOptionsWhere<T> | FindOptionsOrder<T> {
    const where: FindOptionsWhere<T> = {};

    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split 했을때 길이가 2 또는 3이어야합니다 - 문제되는 키값 : ${key}`,
      );
    }

    if (split.length === 2) {
      const [_, field] = split;
      where[field] = value;
    } else {
      const [_, field, operator] = split;
      const values = value.toString().split(',');
      where[field] = FILTER_MAPPER[operator](
        values.length > 1 ? values : value,
      );
    }

    return where;
  }
}
