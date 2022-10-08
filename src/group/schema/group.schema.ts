import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Group {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  groupCreater: string;

  @Prop({ required: true })
  isActive: boolean;
}

export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
