import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CartService } from '../cart/cart.service';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { ProductsResolver } from './products.resolver';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [ProductsService, CartService, ProductsResolver],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
})
export class ProductsModule {
}
