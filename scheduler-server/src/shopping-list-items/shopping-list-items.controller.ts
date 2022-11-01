import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
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
  async createMany(
    @Body(new ParseArrayPipe({ items: CreateShoppingListItemDto }))
    dtos: CreateShoppingListItemDto[],
    @Param('shoppingListId') shoppingListId: string,
  ) {
    const shoppingList = await this.listsService.findOneById(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await Promise.all(dtos.map(async (dto) => await this.itemsService.createOne(dto, shoppingList)));
  }

  @Get(':shoppingListId')
  async findAllByShoppingListId(@Param('shoppingListId') shoppingListId: string) {
    const shoppingList = await this.listsService.findOneById(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await this.itemsService.findAllByShoppingList(shoppingList);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.itemsService.findOneById(+id);
  }

  @Patch()
  async updateMany(
    @Body(new ParseArrayPipe({ items: UpdateShoppingListItemDto }))
    dtos: UpdateShoppingListItemDto[],
  ) {
    return await Promise.all(dtos.map(async (dto) => await this.itemsService.updateOne(dto)));
  }

  @Delete()
  async removeByIds(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]) {
    return await Promise.all(ids.map((id) => this.itemsService.removeById(id)));
  }
}
