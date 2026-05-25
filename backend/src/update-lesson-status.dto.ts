import { IsBoolean } from 'class-validator';

export class UpdateLessonStatusDto {
  @IsBoolean()
  completed: boolean;
}