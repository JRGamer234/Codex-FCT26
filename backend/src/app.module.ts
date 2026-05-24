import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsController } from './lessons.controller';
import { LessonSchema } from './lessons/schemas/lesson.schema';
import { LessonsService } from './lessons.service'; // 👉 Importamos el servicio

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/codex'),
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]),
  ],
  controllers: [AppController, LessonsController],
  providers: [AppService, LessonsService], // 👉 Lo añadimos aquí
})
export class AppModule { }