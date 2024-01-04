import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { Response } from 'express';

// Định nghĩa API
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {} // Bắt buộc viết bên userService

  @Post('api/create-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Get('api/users')
  //   @UseGuards(AuthMiddleware)
  getUsers(@Query() params: { id: number }) {
    return this.userService.getUsers(params);
  }

  @Post('api/login')
  login(@Body() params: any, @Res({ passthrough: true }) response: Response) {
    return this.userService.login(params, response);
  }
}
