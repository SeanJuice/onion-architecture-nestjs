import { createUserDTO } from '@applicationLayer|dtos';
import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordPipe implements PipeTransform {
  async transform(value: createUserDTO, metadata: ArgumentMetadata) {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(value.password, saltOrRounds);
    value.password = password;

    Logger.log(value);
    return value;
  }
}
