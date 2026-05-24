import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonDto } from './create-lesson.dto';
import { LessonDocument } from './lessons/schemas/lesson.schema';

@Injectable()
export class LessonsService {
    constructor(@InjectModel('Lesson') private lessonModel: Model<LessonDocument>) { }

    async findAll() {
        return this.lessonModel.find().exec();
    }

    async findOne(id: string) {
        return this.lessonModel.findById(id).exec();
    }

    async create(createLessonDto: CreateLessonDto) {
        const newLesson = new this.lessonModel(createLessonDto);
        return newLesson.save();
    }

    async updateLessonStatus(id: string, completed: boolean): Promise<any> {
        return this.lessonModel.findByIdAndUpdate(
            id,
            { $set: { completed: completed } },
            { new: true } // Nos devuelve el objeto ya actualizado
        ).exec();
    }

    // 🗑️ NUEVO MÉTODO: Elimina físicamente el documento de la colección de MongoDB
    async remove(id: string): Promise<any> {
        return this.lessonModel.findByIdAndDelete(id).exec();
    }
}