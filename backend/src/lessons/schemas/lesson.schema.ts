import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  content: string;

  @Prop()
  duration: number;

  @Prop()
  level: string;

  @Prop()
  createdBy: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);