export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  findManyById(id: number): Promise<T>;

  update(_id: number, updateBody: T): Promise<T>;
  create(entity: T): Promise<number>;
  delete(id: number);
}
