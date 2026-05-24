import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsNumber()
    @IsOptional()
    duration: number;

    @IsString()
    @IsOptional()
    level: string;
}