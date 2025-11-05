import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // ✅ inject UsersService
  ) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const { user, token } = req.user;
    // const user = await this.usersService.findOrCreate(req.user);

    // const token = this.jwtService.sign({
    //   sub: user._id,
    //   email: user.email,
    //   role: user.role,
    // });

    return {
      message: 'Login successful',
      user,
      token,
    };
  }

}
