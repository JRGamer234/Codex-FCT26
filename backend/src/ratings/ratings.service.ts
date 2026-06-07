import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './schemas/rating.schema';

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<RatingDocument>) {}

  rate(userId: string, userName: string, lessonId: string, lessonTitle: string, stars: number, comment: string) {
    return this.ratingModel.findOneAndUpdate(
      { userId, lessonId },
      { userId, userName, lessonId, lessonTitle, stars, comment },
      { upsert: true, new: true },
    ).exec();
  }

  getAll() {
    return this.ratingModel.find().sort({ createdAt: -1 }).exec();
  }

  async getStats(): Promise<{ total: number; average: number }> {
    const ratings = await this.ratingModel.find().exec();
    const total = ratings.length;
    const average = total ? Math.round((ratings.reduce((s, r) => s + r.stars, 0) / total) * 10) / 10 : 0;
    return { total, average };
  }
}
