import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';

import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  //se debe de instanciar como 1er paso productService
  constructor(private productService:ProductService){}

  @Get('/')
  async getProducts(@Res() res):Promise<Product []> {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products
    })
  }

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO):Promise<Product > {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message:'Product Successfully Created',
      product: product
    })
  }

  @Get('/:productID')
  async getProduct(@Res() res,@Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if(!product) throw new NotFoundException('Product does not exists');
    return res.status(HttpStatus.OK).json(product)
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID){
    const productDeleted = await this.productService.deleteProduct(productID);
    if(!productDeleted) throw new NotFoundException('Product does not exists');
    return res.status(HttpStatus.OK).json({
      message:'Product Deleted Succesfully',
      productDeleted
    })
  }

  @Put('/update/:productID')
  async updateProduct(@Res() res,@Param('productID') productID, @Body() createProductDTO: CreateProductDTO){
    const updatedProduct = await this.productService.updateProduct(productID,createProductDTO)
    if(!updatedProduct) throw new NotFoundException('Product does not exists');

    return res.status(HttpStatus.OK).json({
      message:'Product updated Succesfully',
      updatedProduct
    }) 
  }

}
