import { IsNotEmpty } from 'class-validator';

export class CodeDTO {
  @IsNotEmpty()
  code: number;
}
