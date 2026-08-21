import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task {
  @Prop({
    required: true ,
    trim: true,
  })
  TaskTitle: string;

  // Matches the values actually sent by the frontend/DTO
  @Prop({
    enum: ['noPriority', 'urgent', 'high', 'medium', 'low'],
    default: 'noPriority',
  })
  priority: string;

  @Prop({
    enum: ['todo', 'doing', 'completed', 'onhold'],
    default: 'todo',
  })
  status: string;

  @Prop()
  dueDate?: Date;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: false,
  })
  members?: Types.ObjectId[];

  @Prop({
    type: [String],
    required: false,
  })
  labels?: string[];
  @Prop({
    type: [String],
    required: false,
  })
  teams?: string[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  reporter?: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);