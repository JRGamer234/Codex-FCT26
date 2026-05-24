import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common'; // 👉 Corregido el duplicado y añadido 'Patch'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('lessons')
export class LessonsController {
    constructor(@InjectModel('Lesson') private lessonModel: Model<any>) { }

    @Get()
    async findAll() {
        return this.lessonModel.find().exec();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.lessonModel.findById(id).exec();
    }

    @Post()
    async create(@Body() createLessonDto: any) {
        const newLesson = new this.lessonModel(createLessonDto);
        return newLesson.save();
    }

    // 👉 ¡AÑADIDO EL ENDPOINT PATCH PARA EL PROGRESO REAL EN MONGO!
    @Patch(':id/completed')
    async updateStatus(
        @Param('id') id: string,
        @Body('completed') completed: boolean
    ) {
        return this.lessonModel.findByIdAndUpdate(
            id,
            { $set: { completed: completed } },
            { returnDocument: 'after' } // Esto hace que devuelva el documento ya modificado
        ).exec();
    }
}