import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProduct(@Res() res) {
    const product = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(product);
  }

  @Post('/')
  async createProduct(@Res() res, @Body() createProductoDTo: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductoDTo);
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      product,
    });
  }

  @Get('/:productID')
  async getOneProduct(@Res() res, @Param('productID') productID: string) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('product not exist');
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      product,
    });
  }

  @Delete('/')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const product = await this.productService.deleteProduct(productID);
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      product,
    });
  }

  @Put('/:productID')
  async updateProduct(
    @Res() res,
    @Param('productID') productID: string,
    @Body() createProductoDTo: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      productID,
      createProductoDTo,
    );
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      product,
    });
  }
}
