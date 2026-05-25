import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateLessonDto } from './create-lesson.dto';
import { LessonDocument, Lesson } from './lessons/schemas/lesson.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}

  async findAll() {
    return this.lessonModel.find().exec();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const lesson = await this.lessonModel.findById(id).exec();

    if (!lesson) {
      throw new NotFoundException('Lección no encontrada');
    }

    return lesson;
  }

  async create(dto: CreateLessonDto) {
    const lesson = new this.lessonModel(dto);
    return lesson.save();
  }

  async updateLessonStatus(id: string, completed: boolean) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const updated = await this.lessonModel.findByIdAndUpdate(
      id,
      { completed },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Lección no encontrada');
    }

    return updated;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const deleted = await this.lessonModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Lección no encontrada');
    }

    return deleted;
  }
}