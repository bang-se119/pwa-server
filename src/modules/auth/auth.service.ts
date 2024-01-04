import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JWT } from 'src/shared/constants/constants';

// Xử lý logic
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param params CreateUserDto
   * @returns
   */
  async createUser(params: CreateUserDto) {
    console.log('user info: ', params);
    const { password } = params;
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = { ...params, password: hashedPassword };

    await this.userRepository.save(data);
    return 'New user added successfully!';
  }

  /**
   *
   * @param params { id: number }
   * @returns
   */
  async getUsers(params: { id: number }) {
    const { id } = params;
    if (id) {
      return await this.userRepository.findOne({
        where: { id: id },
      });
    }
    return await this.userRepository.find();
  }

  /**
   *
   * @param params { id: number }
   * @returns
   */
  async login(params: any, response: Response) {
    const { email, password } = params;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not exist !');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const jwt = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: 'secret',
        expiresIn: '1h',
      },
    );

    const refreshJwt = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: 'secret',
        expiresIn: '7d',
      },
    );

    response.cookie(JWT, jwt, { httpOnly: true });

    return {
      token: jwt,
      refreshToken: refreshJwt,
    };
  }
}
