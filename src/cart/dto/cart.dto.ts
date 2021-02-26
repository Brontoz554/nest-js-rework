import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Product } from '../../products/schemas/product.schema';
import { User } from '../../user/schemas/user.schema';

@InputType()
@ObjectType()
export class cartDto {
  @Field(() => ID, { nullable: true })
  readonly _id?: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly user: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly product: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  @Field(() => Number)
  count: number;
}
