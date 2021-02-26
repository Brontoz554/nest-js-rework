import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../products/schemas/product.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Cart {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop()
  user: string;

  @Field(() => Product)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Field(() => Number)
  @Prop()
  count: number;

  @Field(() => Number)
  @Prop()
  price: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
