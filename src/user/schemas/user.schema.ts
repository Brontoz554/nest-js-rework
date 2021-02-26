import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cart } from '../../cart/schemas/cart.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  firstName: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  secondName: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, unique: true })
  phone: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
