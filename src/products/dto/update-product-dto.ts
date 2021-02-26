import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class UpdateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  @Field()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  @Field()
  readonly price: number;
}
