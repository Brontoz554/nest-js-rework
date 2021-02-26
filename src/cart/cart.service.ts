import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { cartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel) {
  }

  /**
   * метод добавляющий товар в корзину
   * @param cart
   */
  async addInCart(cart: cartDto): Promise<any> {
    const cartRecord = await this.cartModel.findOne({
      $and: [
        { user: { $eq: cart.user } },
        { product: { $eq: cart.product } },
      ],
    });
    if (!cartRecord) {
      const cartRecord = await new this.cartModel(cart).save();
      return cartRecord._id;
    } else {
      cartRecord.count += cart.count;
      cartRecord.save();
    }
    return cartRecord._id;
  }

  /**
   * Метод получающий все корзины пользователей
   */
  async getAll(): Promise<Cart> {
    return this.cartModel.find().populate('product');
  }

  /**
   * Отчищает все корзины пользователей
   */
  async removeAll(): Promise<any> {
    const objects = await this.cartModel.find().exec();
    if (objects.length != 0) {
      await this.removeObjects(objects);
    }
  }

  /**
   * Купить все товары находящиеся в корзине пользователя
   * @param userId
   */
  async buyAll(userId): Promise<string> {
    const cart = await this.cartModel.find({ user: userId }).populate('product');
    if (cart.length == 0) {
      return 'Ваша корзина пуста';
    }
    const totalPrice = await this.getProductsPrice(cart);
    await this.removeObjects(cart);
    return `Вы успешно оформили покупку на сумму ${totalPrice}`;
  }

  /**
   * Получить сумму товаров, которые находятся в получаемой колекции
   * @param cart
   */
  async getProductsPrice(cart): Promise<number> {
    let price = 0;
    cart.forEach((item) => {
      price += item.count * item.product.price;
    });

    return price;
  }

  /**
   * Удаляет из корзины один продукт или удаляет всю запись, если count = 0
   * @param userId
   * @param productId
   */
  async buyOneProduct(userId, productId): Promise<any> {
    const product = await this.cartModel.findOne({
      $and: [
        { user: { $eq: userId } },
        { product: { $eq: productId } },
      ],
    }).populate('product');
    if (product) {
      product.count--;
      product.count === 0
        ? product.delete()
        : product.save();
    } else {
      return 'Корзина пуста';
    }
    return `Вы успешно оформили покупку ${product.product.title} на сумму ${product.product.price}`;
  }

  /**
   * Получить товары находящиеся в корзине пользователя
   * @param userId
   */
  async getMyCart(userId): Promise<Cart[]> {
    return await this.cartModel.find({ user: userId }).populate('product');
  }

  /**
   * Отчистить корзину пользователя
   * @param id
   */
  async removeUserCart(id) {
    const userCart = await this.cartModel.find({ user: id }).exec();
    await this.removeObjects(userCart);
  }

  /**
   * Вспомогательный метод, удаляющий все записи которые находятся в получаемой коллекции
   * @param objects
   */
  async removeObjects(objects) {
    objects.forEach((item) => {
      item.delete();
    });
  }
}
