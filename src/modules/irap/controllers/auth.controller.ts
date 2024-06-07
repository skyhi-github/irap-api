import { Controller, Post, HttpCode, Body, UnauthorizedException, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/auth.dto';
import { CreateUserDto } from '../dto';
import { Response } from 'express';

@ApiTags('🔐 Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly userService: UserService,
              private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: 'Register' })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() register: CreateUserDto) {
    return this.userService.create(register)
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.employee_id, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Throw specific exception
    }
    const token = await this.authService.generateToken(user);
    return { token: token };
  }

  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {

      res.clearCookie('session_id');
      res.send('Successfully logged out');
  }
}
