import { UserLoginDTO } from '@applicationLayer|dtos';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/infrastructure/repositories';
import { JwtPayload } from '../interfaces/jwtPayload';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  public async login(loginUserDto: UserLoginDTO) {
    try {
      const user = await this.userRepository.findByLogin(loginUserDto);

      await this.verifyPassword(loginUserDto.password, user.password);
      user.password = undefined;
      const token = this._createToken(user);
      return {
        ...user,
        ...token,
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signin(loginUserDto: UserLoginDTO): Promise<any> {
    try {
      const user = await this.userRepository.findByLogin(loginUserDto);
      if (user) {
        if (user.isVarrified) {
          if (this.verifyPassword(loginUserDto.password, user.password)) {
            user.password = undefined;
            const token = this._createToken(user);
            return {
              ...user,
              ...token,
            };
          }
        } else {
          return new HttpException(
            'Please varify your account',
            HttpStatus.UNAUTHORIZED,
          );
        }
        return new HttpException(
          'Incorrect username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (e) {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async varifyAccount(code: number): Promise<any> {
    try {
      const user = await this.userRepository.findByCode(code);
      if (!user) {
        return new HttpException(
          'Verification code has expired or not found',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.userRepository.update(user.id, {
        isVarrified: true,
        authConfirmToken: undefined,
      });
      await this.emailService.sendConfirmedEmail(user);
      return true;
    } catch (e) {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registerUser(user: User) {
    try {
      const code = Math.floor(10000 + Math.random() * 90000);
      const saltOrRounds = 10;
      user.password = await bcrypt.hash(user.password, saltOrRounds);
      user.phoneNumber = Number(user.phoneNumber);
      user.authConfirmToken = code;

      this.userRepository.create(user).then((res: User) => {
        this.emailService.sendConfirmationEmail(res, code);
      });
      return user;
    } catch (exception: any) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error when adding user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async count() {
    let num = await await this.userRepository.count();
    return num;
  }

  //TODO: Move these helper functions to a utils folder
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return isPasswordMatching;
  }

  async isUserInSystem(_email: string): Promise<boolean> {
    // const user: User | null = await this.userRepository.findByEmail(_email);

    // if (user) {
    //   Logger.log(user.email.toString());
    //   return true;
    // }
    return false;
  }
  async validateUser(payload: JwtPayload): Promise<User> {
    const user: User = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(User): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { ...User };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
