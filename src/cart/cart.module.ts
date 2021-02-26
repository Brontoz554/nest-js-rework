import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './schemas/cart.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { UserService } from '../user/user.service';
import { CartResolver } from './cart.resolver';

@Module({
  providers: [CartService, UserService, CartResolver],
  controllers: [CartController],
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
})
export class CartModule {
}
