import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseArrayPipe } from '@nestjs/common';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { ShoppingListsService } from '../shopping-lists/shopping-lists.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ShoppingListItemDto } from './dto/shopping-list-item.dto';

@Controller('shopping-list-items')
export class ShoppingListItemsController {
  constructor(
    private readonly itemsService: ShoppingListItemsService,
    private readonly listsService: ShoppingListsService,
  ) {}

  @Post(':shoppingListId')
  @Serialize(ShoppingListItemDto)
  async create(
    @Body(new ParseArrayPipe({ items: CreateShoppingListItemDto }))
    dtos: CreateShoppingListItemDto[],
    @Param('shoppingListId') shoppingListId: string,
  ) {
    const shoppingList = await this.listsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await Promise.all(dtos.map(async (dto) => await this.itemsService.create(dto, shoppingList)));
  }

  @Get(':shoppingListId')
  async findAll(@Param('shoppingListId') shoppingListId: string) {
    const shoppingList = await this.listsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await this.itemsService.findAll(shoppingList);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch()
  async update(
    @Body(new ParseArrayPipe({ items: UpdateShoppingListItemDto }))
    dtos: UpdateShoppingListItemDto[],
  ) {
    return await Promise.all(dtos.map(async (dto) => await this.itemsService.update(dto)));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
