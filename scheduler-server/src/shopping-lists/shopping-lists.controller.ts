import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingListsService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly listsService: ShoppingListsService) {}

  @Post()
  create(@Body() dto: CreateShoppingListDto) {
    return this.listsService.create(dto);
  }

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.listsService.findOneById(+id);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() dto: UpdateShoppingListDto) {
    return this.listsService.updateById(+id, dto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.listsService.removeById(+id);
  }
}
