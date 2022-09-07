import { Inject, Injectable, Logger } from '@nestjs/common';
import { Post, User } from '@prisma/client';
import { UserRepository } from 'src/infrastructure/repositories';



@Injectable()
export class UserService {

    constructor(private userrepository: UserRepository) {
        
    }

    async getUserAllUsers() {
        let list: User[]
        list = await (await this.userrepository.getAll())
        return list;
    }

    async count() {
        let num = await (await this.userrepository.count())
        return num;
    }

}