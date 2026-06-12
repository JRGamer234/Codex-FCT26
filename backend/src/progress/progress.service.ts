import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    @InjectModel(User.name) private userModel: Model<any>,
  ) {}

  getUserProgress(userId: string): Promise<ProgressDocument[]> {
    return this.progressModel.find({ userId }).sort({ completedAt: -1 }).exec();
  }

  async completeLesson(
    userId: string,
    userName: string,
    lessonId: string,
    lessonTitle: string,
    lessonCategory: string,
    score = 0,
    total = 0,
  ): Promise<ProgressDocument> {
    return this.progressModel.findOneAndUpdate(
      { userId, lessonId },
      { userId, userName, lessonId, lessonTitle, lessonCategory, score, total, completedAt: new Date() },
      { upsert: true, new: true },
    ).exec() as Promise<ProgressDocument>;
  }

  async getAllProgress(): Promise<any[]> {
    const docs = await this.progressModel.find().sort({ completedAt: -1 }).lean().exec();
    const userIds = [...new Set(docs.map(d => d.userId?.toString()))];
    const users = await this.userModel.find({ _id: { $in: userIds } }).select('name').lean().exec();
    const userMap = Object.fromEntries(users.map(u => [u._id.toString(), u.name]));
    return docs.map(d => ({
      ...d,
      userName: d.userName || userMap[d.userId?.toString()] || 'Alumno',
    }));
  }

  async uncompleteLesson(userId: string, lessonId: string): Promise<void> {
    await this.progressModel.deleteOne({ userId, lessonId }).exec();
  }

  async getUserStats(userId: string) {
    const completed = await this.progressModel.countDocuments({ userId }).exec();
    return { completedLessons: completed };
  }
}
