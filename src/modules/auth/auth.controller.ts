import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Định nghĩa API
@ApiTags('API Auth')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {} // Bắt buộc viết bên userService

  @Post('api/login')
  @ApiBody({ type: LoginDto })
  login(
    @Body() params: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.login(params, response);
  }

  @ApiBody({ type: CreateUserDto })
  @Post('api/create-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server' })
  @HttpCode(HttpStatus.OK)
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Get('api/users')
  @ApiHeader({
    name: 'x-api-token',
    required: true,
  })
  getUsers(@Query() params: { id: number }) {
    return this.userService.getUsers(params);
  }

  @Put('api/update-user/:id')
  updateUser(@Body() params: UpdateUserDto, @Param('id') id: number) {
    return this.userService.updateUser(params, id);
  }

  @Delete('api/delete-user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
