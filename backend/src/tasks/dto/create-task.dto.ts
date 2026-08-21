import { IsArray, IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  TaskTitle: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  members?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teams?: string[];

  @IsOptional()
  @IsMongoId()
  reporter?: string;
}