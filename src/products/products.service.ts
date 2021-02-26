import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product-dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {
  }

  async getAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async getById(id: string): Promise<Product> {

    return this.productModel.findById(id);
  }

  async getByTitle(title: string) {
    return this.productModel.find({ title: { $eq: title } });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async remove(id: string): Promise<boolean> {
    const object = await this.productModel.findByIdAndRemove(id);
    if (object) {
      return true;
    } else {
      return false;
    }
  }

  async removeAll() {
    const objects = await this.productModel.find().exec();
    if (objects.length != 0) {
      objects.forEach((item) => {
        item.delete();
      });
    }
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {

    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
