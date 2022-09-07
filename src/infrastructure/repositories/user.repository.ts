import { Department } from 'src/domain/entities';
import { BaseRepository } from './base.repository';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Logger } from '@nestjs/common';
const prisma = new PrismaClient().user;


export class UserRepository extends BaseRepository<typeof prisma, User> {
  constructor() {
    super(prisma);
  }
}