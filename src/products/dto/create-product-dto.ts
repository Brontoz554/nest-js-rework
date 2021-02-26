import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class CreateProductDto {
  @Field(() => ID, { nullable: true })
  _id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Field({ nullable: true })
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: true })
  readonly price: number;
}
