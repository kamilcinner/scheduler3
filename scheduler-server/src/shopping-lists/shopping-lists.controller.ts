import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseArrayPipe } from '@nestjs/common';
import { ShoppingListsService } from './shopping-lists.service';
import {
  CreateShoppingListDto,
  UpdateShoppingListDto,
  ShoppingListItemDto,
  CreateShoppingListItemDto,
  UpdateShoppingListItemsDto,
} from './dto';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(
    private readonly shoppingListsService: ShoppingListsService,
    private readonly shoppingListItemsService: ShoppingListItemsService,
  ) {}

  @Post()
  createShoppingList(@Body() createShoppingListDto: CreateShoppingListDto) {
    return this.shoppingListsService.create(createShoppingListDto);
  }

  @Post(':shoppingListId')
  @Serialize(ShoppingListItemDto)
  async createShoppingListItems(
    @Body(new ParseArrayPipe({ items: CreateShoppingListItemDto }))
    createShoppingListItemDtos: CreateShoppingListItemDto[],
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

  @Get()
  async findAllShoppingLists() {
    return await Promise.all(
      (
        await this.shoppingListsService.findAll()
      ).map(async (shoppingList) => {
        shoppingList.items = await this.shoppingListItemsService.findAll(shoppingList);
        return shoppingList;
      }),
    );
  }

  @Get(':shoppingListId')
  async findAllShoppingListItems(@Param('shoppingListId') shoppingListId: string) {
    const shoppingList = await this.shoppingListsService.findOne(+shoppingListId);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return await this.shoppingListItemsService.findAll(shoppingList);
  }

  @Get(':id')
  findOneShoppingList(@Param('id') id: string) {
    return this.shoppingListsService.findOne(+id);
  }

  @Get(':id')
  findOneShoppingListItem(@Param('id') id: string) {
    return this.shoppingListItemsService.findOne(+id);
  }

  @Patch(':id')
  updateShoppingList(@Param('id') id: string, @Body() updateShoppingListDto: UpdateShoppingListDto) {
    return this.shoppingListsService.update(+id, updateShoppingListDto);
  }

  @Patch(':shoppingListId/items')
  async updateShoppingListItems(
    @Param('shoppingListId') id: number,
    @Body() updateShoppingListItemsDto: UpdateShoppingListItemsDto,
  ) {
    const shoppingList = await this.shoppingListsService.findOne(id);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    const createdShoppingListItems = await Promise.all(
      updateShoppingListItemsDto.createShoppingListItemDtos.map(
        async (dto) => await this.shoppingListItemsService.create(dto, shoppingList),
      ),
    );
    const updatedShoppingListItems = await Promise.all(
      updateShoppingListItemsDto.updateShoppingListItemDtos.map(
        async (dto) => await this.shoppingListItemsService.update(dto),
      ),
    );
    const removedShoppingListItemsIds = await Promise.all(
      updateShoppingListItemsDto.removeShoppingListItemsIds.map(async (id) => {
        await this.shoppingListItemsService.remove(id);
        return id;
      }),
    );

    return {
      createdShoppingListItems,
      updatedShoppingListItems,
      removedShoppingListItemsIds,
    };
  }

  @Delete(':id')
  removeShoppingList(@Param('id') id: string) {
    return this.shoppingListsService.remove(+id);
  }

  @Delete(':ids')
  async removeShoppingListItems(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return await Promise.all(ids.map(async (id) => await this.shoppingListItemsService.remove(id)));
  }

  @Patch('items/:id/bought')
  toggleShoppingListItemBought(@Param('id') id: number) {
    return this.shoppingListItemsService.toggleBought(id);
  }
}
