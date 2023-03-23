import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Socials {
  facebook: string;

  instagram: string;

  linkedin: string;

  twitter: string;

  github: string;
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Role {
  USER = 'user',
  SUPER = 'super',
}

export enum GroupUserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({
    enum: Role,
    default: Role.USER,
    required: true,
  })
  role: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  graduation_batch: number;

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
  tags: string[];

  @Prop({ type: Socials, required: false })
  socials: Socials;

  @Prop({ required: false })
  resume: string;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: false })
  profile_picture: string;

  @Prop({ select: false, required: true })
  password: string;

  @Prop({ enum: Gender, required: true })
  gender: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
