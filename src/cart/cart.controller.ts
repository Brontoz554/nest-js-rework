import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { cartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
import { Cart } from './schemas/cart.schema';
import { UserService } from '../user/user.service';

@Controller('cart')
export class CartController {
  constructor(
    readonly cartService: CartService,
    readonly userService: UserService,
  ) {
  }

  /**
   * Получить все корзины пользователей
   */
  @Get()
  async getAll(): Promise<Cart> {
    return await this.cartService.getAll();
  }

  @Get('my-cart/:userId')
  async getMyCart(@Param('userId') userId: string): Promise<Cart[]> {
    return await this.cartService.getMyCart(userId);
  }

  /**
   * Оформить покупку на все товары находящиеся в карзине пользователя
   * @param userId
   */
  @Get('buy-all/:userId')
  async buyAll(@Param('userId') userId: string): Promise<string> {
    return await this.cartService.buyAll(userId);
  }

  /**
   * Оформить покупку на один конкретный товар, из корзины пользователя
   * @param userId
   * @param productId
   */
  @Get('buy-one-product/:userId/:productId')
  async buyProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<any> {
    return this.cartService.buyOneProduct(userId, productId);
  }

  /**
   * Добавить товар в корзину
   * @param cart
   */
  @Post()
  async addProductInCart(@Body() cart: cartDto): Promise<any> {
    await this.cartService.addInCart(cart);

    return 'Товар успешно добавлен в карзину';
  }

  /**
   * Отчистить все корзины(для дебага)
   */
  @Delete()
  async removeAll(): Promise<string> {
    await this.cartService.removeAll();
    return 'Все корзины отчищены';
  }

}
