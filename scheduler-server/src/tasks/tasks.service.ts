import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  create(createTaskDto: CreateTaskDto) {
    const task = this.repo.create(createTaskDto);
    return this.repo.save(task);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    Object.assign(task, updateTaskDto);
    return this.repo.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return this.repo.remove(task);
  }
}
