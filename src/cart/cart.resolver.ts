import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './schemas/cart.schema';
import { cartDto } from './dto/cart.dto';

@Resolver()
export class CartResolver {
  constructor(
    readonly cartService: CartService,) {}

  @Query(() => [Cart])
  /**
   * Получить все корзины пользователей
   */
  getAllCarts(): Promise<Cart> {
    return this.cartService.getAll();
  }

  @Query(() => [Cart])
  /**
   * Получить корзину пользователя по id
   * @param userId
   */
  getMyCart(@Args('userId') userId: string) {
    return this.cartService.getMyCart(userId);
  }

  @Query(() => String)
  /**
   * Купить все продукты находящиеся в корзине пользователя
   * @param userId
   */
  buyAll(@Args('userId') userId: string) {
    return this.cartService.buyAll(userId);
  }

  @Query(() => String)
  /**
   * Купить продукт находящийся в корзине
   * @param userId
   * @param productId
   */
  buyProduct(@Args('userId') userId: string, @Args('productId') productId: string) {
    return this.cartService.buyOneProduct(userId, productId);
  }

  @Mutation(() => [Cart])
  /**
   * Добавить продукт в корзину
   */
  async addProductInCart(@Args('cartDto') CartDto: cartDto) {
    await this.cartService.addInCart(CartDto);
    return this.getMyCart(CartDto.user);
  }

  @Query(() => [Cart])
  /**
   * Отчистить все корзины пользователей.
   */
  async removeAllCarts() {
    await this.cartService.removeAll();
    return this.getAllCarts();
  }
}