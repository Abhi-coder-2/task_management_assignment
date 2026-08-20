import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);

    return await task.save();
  }

  async findAll() {
    return await this.taskModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel
      .findById(id)
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskModel
      .findByIdAndUpdate(
        id,
        updateTaskDto,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel
      .findByIdAndDelete(id)
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return {
      message: 'Task deleted successfully',
      task,
    };
  }
}