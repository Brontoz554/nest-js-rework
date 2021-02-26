import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductsService } from './products.service';
import { CartService } from '../cart/cart.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly cartService: CartService,
  ) {
  }

  @Get()
  /**
   * Получить все существующие товары
   */
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  /**
   * Получить информацию о товаре продукте по id
   * @param id
   */
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Post()
  /**
   * Создать новый товар
   */
  async create(@Body() createProduct: CreateProductDto): Promise<Product | any> {
    try {
      const product = await this.productService.create(createProduct);
      return {
        product: product,
        success: true,
      };
      // @ts-ignore
    } catch (e: ExceptionsHandler) {
      return {
        message: e,
        success: false,
      };
    }
  }

  @Put(':id')
  /**
   * Изменить характеристики товара
   * @param productDto
   * @param id
   */
  update(
    @Body() productDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, productDto);
  }


  @Delete(':id')
  /**
   * Удалить товар
   * @param id
   */
  async remove(@Param('id') id: string) {
    const status = await this.productService.remove(id);
    if (status) {
      return {
        message: `Товар ${id} успешно удалён`,
        success: true,
      };
    }
    return {
      message: 'Товар не найден',
      success: false,
    };
  }

  @Delete('delete-all')
  /**
   * Удалить все товары
   */
  async deleteAll(): Promise<string> {
    await this.cartService.removeAll();
    // await this.productService.removeAll();
    return 'Все товары удалены, а корзины пользователей отчищены';
  }
}
