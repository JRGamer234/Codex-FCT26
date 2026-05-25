import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { LessonSchema, Lesson } from './lessons/schemas/lesson.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost:27017/codex',
    ),

    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [AppController, LessonsController],
  providers: [AppService, LessonsService],
})
export class AppModule {}