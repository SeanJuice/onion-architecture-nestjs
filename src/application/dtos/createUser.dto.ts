import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class createUserDTO {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  readonly roleId: number;

  @IsOptional()
  readonly createdAt: Date;

  @IsOptional()
  readonly authConfirmToken: number;

  @IsOptional()
  readonly isVarrified: boolean;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  public phoneNumber: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
