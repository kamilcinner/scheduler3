import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { ShoppingListsService } from '../shopping-lists/shopping-lists.service';

@Controller('shopping-list-items')
export class ShoppingListItemsController {
  constructor(
    private readonly shoppingListItemsService: ShoppingListItemsService,
    private readonly shoppingListsService: ShoppingListsService,
  ) {}

  @Post(':shoppingListId')
  async create(
    @Body() createShoppingListItemDtos: CreateShoppingListItemDto[],
    @Param('shoppingListId') shoppingListId: string,
  ) {
    const shoppingList = await this.shoppingListsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await this.shoppingListItemsService.create(createShoppingListItemDtos, shoppingList);
  }

  @Get(':shoppingListId')
  async findAll(@Param('shoppingListId') shoppingListId: string) {
    const shoppingList = await this.shoppingListsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await this.shoppingListItemsService.findAll(shoppingList);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingListItemDto: UpdateShoppingListItemDto) {
    return this.shoppingListItemsService.update(+id, updateShoppingListItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListItemsService.remove(+id);
  }
}
