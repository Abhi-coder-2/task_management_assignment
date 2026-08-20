import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async guestLogin() {
    let user = await this.userModel
      .findOne({
        username: 'guest',
      })
      .exec();

    // Create guest user if it doesn't exist
    if (!user) {
      user = await this.userModel.create({
        name: 'Guest User',
        username: 'guest',
        email: 'guest@example.com',
      });
    }

    return {
      message: 'Guest login successful',
      user,
    };
  }

  async findAll() {
    return await this.userModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    return await this.userModel
      .findById(id)
      .exec();
  }
}