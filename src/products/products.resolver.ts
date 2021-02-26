import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product-dto';
import { CartService } from '../cart/cart.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) {
  }

  @Query(() => [Product])
  /**
   * Получить все товары
   */
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Query(() => Product)
  /**
   * Получить конкретный товар
   * @param id
   */
  getProduct(@Args('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Mutation(() => Product)
  /**
   * Добавить новый продукты
   * @param createProduct
   */
  addProduct(@Args('createProduct') createProduct: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProduct);
  }

  @Mutation(() => Product)
  /**
   * Удалить продукт
   * @param id
   */
  removeProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }

  @Mutation(() => Product)
  /**
   * Изменить описание продукта
   * @param id
   * @param productDto
   */
  updateProduct(
    @Args('id') id: string,
    @Args('updateProduct') productDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, productDto);
  }

  @Query(() => Product)
  /**
   * Удалить все продукты
   */
  async removeAllProduct() {
    await this.cartService.removeAll();
    await this.productsService.removeAll();

    return this.getAllProducts();
  }
}