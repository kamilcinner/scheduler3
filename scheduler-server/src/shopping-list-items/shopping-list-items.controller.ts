import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { ShoppingListsService } from '../shopping-lists/shopping-lists.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ShoppingListItemDto } from './dto/shopping-list-item.dto';
import { ValidateNested } from 'class-validator';
import { UpdateShoppingListItemsDto } from './dto/update-shopping-list-items.dto';

@Controller('shopping-list-items')
export class ShoppingListItemsController {
  constructor(
    private readonly shoppingListItemsService: ShoppingListItemsService,
    private readonly shoppingListsService: ShoppingListsService,
  ) {}

  @Post(':shoppingListId')
  @Serialize(ShoppingListItemDto)
  async create(
    @Body() createShoppingListItemDtos: CreateShoppingListItemDto[],
    @Param('shoppingListId') shoppingListId: string,
  ) {
    const shoppingList = await this.shoppingListsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await Promise.all(
      createShoppingListItemDtos.map(async (dto) => await this.shoppingListItemsService.create(dto, shoppingList)),
    );
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

  @Patch()
  async update(@Body() updateShoppingListItemsDto: UpdateShoppingListItemsDto) {
    return await Promise.all(
      updateShoppingListItemsDto.items.map(async (dto) => await this.shoppingListItemsService.update(dto)),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListItemsService.remove(+id);
  }
}
