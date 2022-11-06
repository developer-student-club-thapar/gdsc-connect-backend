import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Token {
  @Prop({ required: true, unique: true })
  access_token: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);
