import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities';
import { CreateEmployeeDto } from '../dto';
import { EmployeeRepository  } from '../repositories/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly EmployeeRepository: EmployeeRepository
  ) {}


  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new Employee();

    newEmployee.employee_id = createEmployeeDto?.employee_id;
    newEmployee.manager_id = createEmployeeDto?.manager_id;
    newEmployee.position_name = createEmployeeDto?.position_name;
    newEmployee.department_name = createEmployeeDto?.department_name;

    return await this.employeeRepository.save(newEmployee);
  }

  async getEmployee(employee_id: any) {

    const employee = await this.EmployeeRepository.$findOne('employee_id', employee_id);

    return employee;
  }

}
