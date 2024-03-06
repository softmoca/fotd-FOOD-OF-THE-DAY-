import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { CheckEmailDto } from './dto/checkEmail.dto';
import { CheckNickNameDto } from './dto/checkNickName.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, nickName, password } = signUpDto;

    const isUserEmailExist = await this.userRepository.findOne({
      where: { email },
    });
    const isUserNickNamelExist = await this.userRepository.findOne({
      where: { nickName },
    });

    if (isUserEmailExist) {
      throw new NotFoundException('이미 해당 이메일로 가입한 유저가 있습니다.');
    }
    if (isUserNickNamelExist) {
      throw new NotFoundException(
        '이미 해당 닉네임으로 가입한 유저가 있습니다.',
      );
    }

    const hasgedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.save({
      email: email,
      nickName: nickName,
      password: hasgedPassword,
    });

    return user;
  }

  async checkEmail(chekcEmailDto: CheckEmailDto) {
    const { email } = chekcEmailDto;

    const isUserIdExist = await this.userRepository.findOne({
      where: { email },
    });

    if (isUserIdExist) {
      console.log(isUserIdExist);
      throw new BadRequestException(['이미 사용중인 이메일 입니다.']);
    }
    console.log(email);
    return email;
  }

  async checkNickName(checkNickNameDto: CheckNickNameDto) {
    const { nickName } = checkNickNameDto;

    const isUserIdExist = await this.userRepository.findOne({
      where: { nickName },
    });

    if (isUserIdExist) {
      console.log(isUserIdExist);
      throw new BadRequestException(['이미 사용중인 닉네임 입니다.']);
    }

    console.log(nickName);
    return nickName;
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['posts', 'postComments'],
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
