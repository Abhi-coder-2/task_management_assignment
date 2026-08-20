import {
  IsArray,
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

  @IsOptional()
  @IsEnum(['todo', 'doing', 'completed', 'onhold'])
  status?: string;

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  priority?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  members?: string[];

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teams?: string[];

  @IsOptional()
  @IsMongoId()
  reporter?: string;
}