import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel) {
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().populate('cart');
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    const newUser = new this.userModel(createUserDto);
    try {
      const user = await newUser.save();
      return {
        user: user,
        message: 'Вы успешно зарегистрировались',
        success: true,
      };
      // @ts-ignore
    } catch (e: ExceptionsHandler) {
      return {
        user: e,
        message: 'Что-то пошло не так',
        success: false,
      };
    }
  }

  async removeUser(id: string): Promise<boolean> {
    const object = await this.userModel.findByIdAndRemove(id);
    if (object) {
      return true;
    } else {
      return false;
    }
  }

  async removeAll(): Promise<any> {
    const objects = await this.userModel.find();
    objects.forEach((item) => {
      item.delete();
    });
    await this.getAll();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async addInCart(cart, cartId): Promise<any> {
    const user = await this.userModel.findById(cart.user);
    await user.cart.push(cartId);
    return user.save();
  }
}
