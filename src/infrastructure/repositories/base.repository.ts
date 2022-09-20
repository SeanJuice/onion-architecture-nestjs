export class BaseRepository<T, K> {
  repository: any;

  constructor(protected _repository: T) {
    this.repository = _repository;
  }

  async create(data: any): Promise<K> {
    let profile: K = this.repository.create({
      data: {
        ...data,
      },
    });
    return profile;
  }

  async createMany(data: K[]) {
    await new Promise<void>((resolve) => {
      this.repository.createMany({ data });
    });
  }

  async getAll() {
    return this.repository.findMany();
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async findById(...args) {
    const data = await this.repository.findUnique({
      where: {
        ...args,
      },
    });
    if (!data) return null;

    return data;
  }

  async findManyById(...args) {
    const data = await this.repository.findMany({
      where: {
        ...args,
      },
    });
    if (!data) return null;

    return data;
  }

  async update(_id: number, updateBody: any): Promise<K> {
    const saved: K = await this.repository.update({
      where: {
        id: _id,
      },
      data: {
        ...updateBody,
      },
    });

    return saved;
  }

  async delete(_id: number) {
    const data = await this.repository.delete({
      where: {
        id: _id,
      },
    });
    return data;
  }
}
