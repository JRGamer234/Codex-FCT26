import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Progress, ProgressSchema } from './schemas/progress.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Progress.name, schema: ProgressSchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
