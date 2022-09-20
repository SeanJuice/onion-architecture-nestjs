import { AuthController } from '@applicationLayer|controllers';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/domain/helpers';
import { AuthService, EmailService, UserService } from 'src/domain/services';
import { UserRepository } from 'src/infrastructure/repositories';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    UserService,
    EmailService,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
