import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CartService } from '../cart/cart.service';
import * as mongoose from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartService: CartService) {
  }

  @Get()
  /**
   * Получить всех юзеров
   */
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  /**
   * Получить конкретного юзера по id
   * @param id
   */
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  /**
   * Создание нового юзера
   */
  createUser(@Body() createUser: CreateUserDto): Promise<object | unknown> {
    return this.userService.create(createUser);
  }

  @Put(':id')
  /**
   * Изменение данных пользователя
   * @param createUser
   * @param id
   */
  update(@Body() createUser: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(id, createUser);
  }

  @Delete('delete-all-users')
  /**
   * Удалить всех юзеров
   */
  removeAllUsers() {
    return this.userService.removeAll();
  }

  @Delete(':id')
  /**
   * Удалить конкретного юзера
   * @param id
   */
  async removeUser(@Param('id') id: string): Promise<object> {
    await this.cartService.removeUserCart(id);
    const status = await this.userService.removeUser(id);
    if (status) {
      return {
        message: `пользователь ${id} успешно удалён`,
        success: true,
      };
    }
    return {
      message: 'пользователь не найден',
      success: false,
    };
  }
}
