import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 1. Importación del controlador (está en la misma carpeta que este archivo)
import { LessonsController } from './lessons.controller';

// 2. Importación del esquema (tienes que entrar en la carpeta lessons/schemas)
import { LessonSchema } from './lessons/schemas/lesson.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/codex'),

    // Aquí registramos el modelo para que el controlador lo pueda usar
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]),
  ],
  controllers: [AppController, LessonsController],
  providers: [AppService],
})
export class AppModule { }