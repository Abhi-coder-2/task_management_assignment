import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
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
    type: [{ type: Types.ObjectId, ref: 'Team' }],
    required: false,
  })
  teams?: Types.ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  reporter?: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);