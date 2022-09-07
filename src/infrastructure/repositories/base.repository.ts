import { plainToClass } from 'class-transformer';
import { Post, Prisma, PrismaClient, User } from '@prisma/client';
import { Logger } from '@nestjs/common';

export class BaseRepository<T, K> {
  repository:any;

  constructor(protected _repository: T) {
     this.repository = _repository;
  }

  async getAll(){

      return this.repository.findMany();
    
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }



  async findById(_id: any) {
    const data = await this.repository.findUnique({
      where: {
        id: _id,
      },
    });
    if (!data) return null;

    return data;
  }

  async delete(query: any) {
    const data = await this.repository.delete(query);
    return data;
  }

  async create(data: any): Promise<K> {
    let profile: K = this.repository.create(data);
    return profile;
  }

  async createMany(data: K[]) {
    await new Promise<void>((resolve) => {
      this.repository.createMany({ data });
    });
  }

  async update(query: any, updateBody: any): Promise<K> {
    const saved: K = await this.repository.update({
      where: {
        id: query.id,
      },
      data: {
        ...updateBody,
      },
    });

    return saved;
  }
}
