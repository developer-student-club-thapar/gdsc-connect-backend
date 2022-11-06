import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  })
  groupId: string;

  @Prop({
    type: [
      {
        type: String,
        enum: ['tag1', 'tag2', 'tag3'],
        required: false,
      },
    ],
    default: [],
  })
  tags: String[];

  @Prop({
    type: [
      {
        type: String,
        required: false,
      },
    ],
    default: [],
  })
  eligibility: String[];

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true })
  date_posted: Date;
}

export type JobDocument = Job & Document;
export const JobSchema = SchemaFactory.createForClass(Job);
