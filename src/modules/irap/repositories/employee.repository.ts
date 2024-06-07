import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async $findOne<K extends keyof Employee>(key: K, value: Employee[K]): Promise<Employee | undefined> {
    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    queryBuilder.where(`${key} = :value`, { value });

    return await queryBuilder.getOne();
  }
  async $save(data: object): Promise<Employee | undefined> {
  
    try {
      const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

      const insertValues: { [key: string]: any } = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          insertValues[key] = data[key];
        }
      }

      queryBuilder.insert().values(insertValues);

      const savedEntity = await queryBuilder.getOne();
      return savedEntity;
    } catch (error) {
      console.error('Error saving to SQL:', error);
      return undefined;
    }
  }
  
}
