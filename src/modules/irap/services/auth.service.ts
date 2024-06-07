import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly UserRepository: UserRepository
  ) {}

  async validateUser(employee_id: string, password: string): Promise<any | undefined> {
    const user = await this.UserRepository.$findOne('employee_id', employee_id); // Find user by email
    if (!user) {
      throw new UnauthorizedException('Invalid Employee ID');
    }
    const isPasswordValid = await this.comparePassword(password, user.password); // Compare hashed passwords
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }
    return user;
  }

  async generateToken(user: any) {
  
    const payload = { username: user.username, sub: user.id };

    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '168h',
    });
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
