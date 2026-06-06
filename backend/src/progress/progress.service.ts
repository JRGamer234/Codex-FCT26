import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<ProgressDocument>) {}

  getUserProgress(userId: string): Promise<ProgressDocument[]> {
    return this.progressModel.find({ userId }).sort({ completedAt: -1 }).exec();
  }

  async completeLesson(userId: string, lessonId: string, lessonTitle: string, lessonCategory: string): Promise<ProgressDocument> {
    return this.progressModel.findOneAndUpdate(
      { userId, lessonId },
      { userId, lessonId, lessonTitle, lessonCategory, completedAt: new Date() },
      { upsert: true, new: true },
    ).exec() as Promise<ProgressDocument>;
  }

  async uncompleteLesson(userId: string, lessonId: string): Promise<void> {
    await this.progressModel.deleteOne({ userId, lessonId }).exec();
  }

  async getUserStats(userId: string) {
    const completed = await this.progressModel.countDocuments({ userId }).exec();
    return { completedLessons: completed };
  }
}
