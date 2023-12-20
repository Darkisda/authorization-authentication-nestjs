import { AppAbility } from '@auth/casl';
import { CheckPolicies, Public } from '@auth/decorators';
import { Actions } from '@auth/entities';
import { AuthGuard, PolicyGuard } from '@auth/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard, PolicyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, Product))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Product))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, Product))
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
