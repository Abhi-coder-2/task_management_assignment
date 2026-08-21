import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

  // CREATE TASK
  async create(createTaskDto: CreateTaskDto) {
    // console.log('CREATE TASK DTO:', createTaskDto);

    if (!createTaskDto.TaskTitle?.trim()) {
      throw new BadRequestException('TaskTitle is required');
    }

    const task = new this.taskModel({
      TaskTitle: createTaskDto.TaskTitle.trim(),
      priority: createTaskDto.priority ?? 'noPriority',
      status: createTaskDto.status ?? 'todo',
      dueDate: createTaskDto.dueDate,
      members: createTaskDto.members ?? [],
      labels: createTaskDto.labels ?? [],
      teams: createTaskDto.teams ?? [],
      reporter: createTaskDto.reporter,
    });
    return await task.save();
  }

  // GET ALL TASKS
  async findAll() {
    return await this.taskModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  // GET ONE TASK
  async findOne(id: string) {
    const task = await this.taskModel
      .findById(id)
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // UPDATE TASK
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

  // DELETE TASK
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