import { BadGatewayException, Injectable } from '@nestjs/common';
import { BaseEntity } from 'src/domain/entities';
import { IBaseService } from 'src/domain/interfaces';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: any) {}

  create(entity: any): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.genericRepository
          .create(entity)
          .then((created) => resolve(created.id))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.genericRepository.getAll();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findById(id: number): Promise<T> {
    try {
      return <Promise<T>>this.genericRepository.findById(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findManyById(id: number): Promise<T> {
    try {
      return <Promise<T>>this.genericRepository.findManyById(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  delete(id: number) {
    try {
      this.genericRepository.delete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  update(id: number, entity: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        this.genericRepository.update(id, entity);
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
