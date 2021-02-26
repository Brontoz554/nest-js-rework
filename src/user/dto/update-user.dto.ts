import {
  IsNotEmpty, IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @Field()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly secondName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11) // 8 999
  @MaxLength(12) // +7 999
  @Field()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly password: string;
}
