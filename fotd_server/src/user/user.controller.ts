import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from './user.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/entities/User';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CheckEmailDto } from './dto/checkEmail.dto';
import { CheckNickNameDto } from './dto/checkNickName.dto';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signUp')
  async SignUp(@Body() signUpDto: SignUpDto) {
    console.log('sssss');
    console.log(signUpDto);
    console.log('sssss');
    return this.userService.signUp(signUpDto);
  }

  @Post('/localSignIn')
  async localSignIn(@Body() signInDto: SignInDto) {
    return this.authService.localSignIn(signInDto);
  }

  @Post('checkEmail')
  async checkEmail(@Body() chekcEmailDto: CheckEmailDto) {
    return this.userService.checkEmail(chekcEmailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userData')
  async getUserData(@CurrentUser() user: User) {
    console.log('ddd');
    const id = user.id;
    const userData = await this.userService.getUserById(id);
    // console.log(userData);
    return userData;
  }

  @Post('checkNickName')
  async checkNickName(@Body() checkNickNameDto: CheckNickNameDto) {
    return this.userService.checkNickName(checkNickNameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  guardTest(@CurrentUser() user: User) {
    return user;
  }
}
