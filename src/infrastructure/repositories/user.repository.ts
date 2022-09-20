import { UserLoginDTO } from '@applicationLayer|dtos';
import { PrismaClient, User } from '@prisma/client';
import { BaseRepository } from './base.repository';
const prisma = new PrismaClient().user;

export class UserRepository extends BaseRepository<typeof prisma, User> {
  constructor() {
    super(prisma);
  }

  async findByLogin(loginDetails: UserLoginDTO) {
    const user = await prisma.findFirst({
      where: {
        email: loginDetails.email,
      },
    });
    return user;
  }

  async findByEmail(_email: string) {
    const data = await this.repository.findFirst({
      where: {
        email: _email,
      },
    });

    if (data == null) return null;
    return data;
  }

  async findByCode(code: number) {
    const data = await this.repository.findFirst({
      where: {
        authConfirmToken: code,
      },
    });
    if (!data) return null;

    return data;
  }
}
