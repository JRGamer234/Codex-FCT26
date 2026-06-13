import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(@InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>) {}

  findAll(): Promise<LessonDocument[]> {
    return this.lessonModel.find().exec();
  }

  async findOne(id: string): Promise<LessonDocument> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) throw new NotFoundException('Lección no encontrada');
    return lesson;
  }

  create(dto: CreateLessonDto, createdBy?: string): Promise<LessonDocument> {
    return this.lessonModel.create({ ...dto, createdBy });
  }

  async update(id: string, dto: Partial<CreateLessonDto>): Promise<LessonDocument> {
    const lesson = await this.lessonModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!lesson) throw new NotFoundException('Lección no encontrada');
    return lesson;
  }

  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Lección no encontrada');
  }
}
