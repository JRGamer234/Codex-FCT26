import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressModule } from './progress/progress.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/codex'),
    AuthModule,
    UsersModule,
    LessonsModule,
    ProgressModule,
    RatingsModule,
  ],
})
export class AppModule {}
