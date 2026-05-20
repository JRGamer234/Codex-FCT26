import { Controller, Get, Param } from '@nestjs/common';
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
}