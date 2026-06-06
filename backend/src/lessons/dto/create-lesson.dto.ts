import { IsString, IsEnum, IsArray, IsOptional, ValidateNested, IsNumber, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

class SectionDto {
  @IsString() title: string;
  @IsString() content: string;
  @IsOptional() @IsString() code?: string;
}

class QuestionDto {
  @IsString() question: string;
  @IsArray() @IsString({ each: true }) options: string[];
  @IsNumber() correct: number;
}

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  description: string;

  @IsEnum(['Inicial', 'Intermedio', 'Avanzado'])
  level: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections?: SectionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}
