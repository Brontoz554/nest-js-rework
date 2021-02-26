import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CartService } from '../cart/cart.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {
  }

  @Query(() => [User])
  /**
   * Получить данные всех юзеров
   */
  getAllUser() {
    return this.userService.getAll();
  }

  @Query(() => User)
  /**
   * Получить данные юзера по id
   * @param userId
   */
  getUser(@Args('userId') userId: string) {
    return this.userService.getById(userId);
  }

  @Query(() => User)
  /**
   * Удалить данные пользователя
   */
  async deleteUser(@Args('id') id: string) {
    await this.cartService.removeUserCart(id);
    await this.userService.removeUser(id);

    return this.getUser(id);
  }

  @Query(() => [User])
  /**
   * Удалить всех пользователей и отчистить их корзины
   */
  async deleteAllUsers() {
    await this.userService.removeAll();
    await this.cartService.removeAll();

    return this.getAllUser();
  }

  @Mutation(() => User)
  /**
   * Добавить нового пользователя
   */
  async createUser(@Args('user') user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    return newUser.user;
  }

  @Mutation(() => User)
  /**
   * Изменить данные пользователя
   * @param id
   * @param user
   */
  updateUser(@Args('id') id: string, @Args('updateUser') user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

}