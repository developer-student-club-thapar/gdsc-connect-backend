import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Token {
    @Prop({ required: true, unique: true })
    @ApiProperty()
    access_token: string;

    @Prop({ required: true, unique: true })
    @ApiProperty()
    email: string;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);
