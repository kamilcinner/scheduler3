import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingListItemDto, UpdateShoppingListItemDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingListItem, ShoppingList } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingListItemsService {
  constructor(@InjectRepository(ShoppingListItem) private readonly repo: Repository<ShoppingListItem>) {}

  create(createShoppingListItemDto: CreateShoppingListItemDto, shoppingList: ShoppingList) {
    const item = this.repo.create(createShoppingListItemDto);
    item.shoppingList = shoppingList;
    return this.repo.save(item);
  }

  findAll(shoppingList: ShoppingList) {
    return this.repo.find({ where: { shoppingList } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(updateShoppingListItemDto: UpdateShoppingListItemDto) {
    const item = await this.findOne(updateShoppingListItemDto.id);

    if (!item) {
      throw new NotFoundException('shopping list item not found');
    }

    // Object.assign(item, updateShoppingListItemDto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundException('shopping list item not found');
    }

    return this.repo.remove(item);
  }
}
