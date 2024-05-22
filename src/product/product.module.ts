import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ], //en js se creaba el modelo de DB en el schema ahora nest lo cambia-- todo en un arreglo para luego colocar mas schemas separados por ,
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
