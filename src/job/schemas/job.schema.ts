import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Schema()
export class Job {
  _id: string;

  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  company: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  url: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  userId: string;

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
  @ApiProperty()
  tags: string[];

  @Prop({ required: true })
  @ApiProperty()
  eligibility: String[];

  @Prop({ required: true })
  @ApiProperty()
  deadline: Date;

  @Prop({ required: true })
  @ApiProperty()
  date_posted: Date;
}

export type JobDocument = Job & Document;
export const JobSchema = SchemaFactory.createForClass(Job);
