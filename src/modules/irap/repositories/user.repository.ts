import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async $findOne<K extends keyof User>(key: K, value: User[K]): Promise<User | undefined> {
    const queryBuilder = this.UserRepository.createQueryBuilder('user');

    queryBuilder.where(`${key} = :value`, { value });

    return await queryBuilder.getOne();
  }
}
