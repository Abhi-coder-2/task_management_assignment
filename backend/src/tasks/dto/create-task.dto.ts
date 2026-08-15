import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum([
    'Development',
    'Design',
    'Marketing',
    'Testing',
    'Documentation',
  ])
  category: string;

  @IsEnum(['Low', 'Medium', 'High'])
  priority: string;

  @IsOptional()
  @IsEnum(['todo', 'doing', 'completed', 'onhold'])
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsMongoId()
  assignedTo?: string;
}