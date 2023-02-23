import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('producto') readonly product: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.product.find();
    return products;
  }
  async getProduct(productId: string): Promise<Product> {
    const product = await this.product.findById(productId);
    return product;
  }
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = await new this.product(createProductDTO);
    await product.save();
    return product;
  }

  async updateProduct(
    productoID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const product = await this.product.findByIdAndUpdate(
      productoID,
      createProductDTO,
      { new: true },
    );
    return product;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.product.findByIdAndDelete(productId);
    return product;
  }
}
