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

  @Prop({ default: 0 })
  duration: number;

  @Prop()
  level: string;

  @Prop({ default: false })
  completed: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);