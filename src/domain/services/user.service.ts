import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/infrastructure/repositories';
import { BaseService } from './base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private userrepository: UserRepository) {
    super(userrepository);
  }

  async getUserAllUsers() {
    let list: User[];
    list = await await this.userrepository.getAll();
    return list;
  }

  async count() {
    let num = await await this.userrepository.count();
    return num;
  }
}
