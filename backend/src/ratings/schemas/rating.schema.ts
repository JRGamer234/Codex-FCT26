import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) userName: string;
  @Prop({ required: true }) lessonId: string;
  @Prop({ required: true }) lessonTitle: string;
  @Prop({ required: true, min: 1, max: 5 }) stars: number;
  @Prop({ default: '' }) comment: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
RatingSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
