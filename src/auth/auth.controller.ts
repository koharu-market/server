// src/auth/auth.controller.ts

import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = this.usersService.findByUsername(username);
    if (user && user.password === password) {
      // 세션에 사용자 정보 저장
      req.session.user = { id: user.id, username: user.username };

      // 쿠키 설정 (세션 미들웨어가 자동으로 쿠키를 설정해줌)
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  }
}
