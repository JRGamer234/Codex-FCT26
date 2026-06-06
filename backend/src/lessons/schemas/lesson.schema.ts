import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ _id: false })
class Section {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) content: string;
  @Prop() code?: string;
}
const SectionSchema = SchemaFactory.createForClass(Section);

@Schema({ _id: false })
class Question {
  @Prop({ required: true }) question: string;
  @Prop({ type: [String], required: true }) options: string[];
  @Prop({ required: true }) correct: number;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: ['Inicial', 'Intermedio', 'Avanzado'], default: 'Inicial' })
  level: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [SectionSchema], default: [] })
  sections: Section[];

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop()
  createdBy?: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
