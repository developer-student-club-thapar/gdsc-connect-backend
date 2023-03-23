import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Invite {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  invite_code: string;
}

export type InviteDocument = Invite & Document;
export const InviteSchema = SchemaFactory.createForClass(Invite);
