import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema()
export class Product {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => String)
  @Prop({ type: String, unique: true, nullable: true })
  title: string;

  @Field(() => Number)
  @Prop({ type: Number, nullable: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
