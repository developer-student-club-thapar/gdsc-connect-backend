import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Invite {
  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  invitecode: string;
}

export type InviteDocument = Invite & Document;
export const InviteSchema = SchemaFactory.createForClass(Invite);
