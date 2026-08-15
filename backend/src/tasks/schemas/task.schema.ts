import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({
    required: true,
    enum: ['Development', 'Design', 'Marketing', 'Testing', 'Documentation'],
  })
  category: string;

  @Prop({
    required: true,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  })
  priority: string;

  @Prop({
    required: true,
    enum: ['todo', 'doing', 'completed', 'onhold'],
    default: 'todo',
  })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  assignedTo?: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);