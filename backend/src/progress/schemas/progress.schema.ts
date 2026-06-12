import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true })
export class Progress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: '' })
  userName: string;

  @Prop({ required: true })
  lessonId: string;

  @Prop({ required: true })
  lessonTitle: string;

  @Prop({ required: true })
  lessonCategory: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 0 })
  total: number;

  @Prop({ default: Date.now })
  completedAt: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

ProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
