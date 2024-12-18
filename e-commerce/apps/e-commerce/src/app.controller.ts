import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, UsersDocument } from '@app/common';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@CurrentUser() user: UsersDocument) {
    return user;
  }
}
