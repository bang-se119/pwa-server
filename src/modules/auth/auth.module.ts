// Khai báo
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'api/users', method: RequestMethod.GET },
      // { path: 'api/logout', method: RequestMethod.POST },
      // { path: 'api/create-user', method: RequestMethod.POST },
      // { path: 'api/update-user/:id', method: RequestMethod.PUT },
      // { path: 'api/delete-user/:id', method: RequestMethod.DELETE },
    );
  }
}
