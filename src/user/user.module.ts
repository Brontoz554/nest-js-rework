import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CartService } from '../cart/cart.service';
import { User, UserSchema } from './schemas/user.schema';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, CartService, UserResolver],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
})
export class UserModule {
}
