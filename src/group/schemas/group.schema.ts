import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Group {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  admins: User[];

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, unique: false })
  members: string[];
}

export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
