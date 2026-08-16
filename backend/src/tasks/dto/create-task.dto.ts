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
  title: string | undefined;

  @IsString()
  @IsNotEmpty()
  description: string | undefined;

  @IsEnum([
    'Development',
    'Design',
    'Marketing',
    'Testing',
    'Documentation',
  ])
  category: string | undefined;

  @IsEnum(['Low', 'Medium', 'High'])
  priority: string | undefined;

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