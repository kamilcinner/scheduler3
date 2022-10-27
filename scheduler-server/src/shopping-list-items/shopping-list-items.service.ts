import { Injectable } from '@nestjs/common';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingListItem } from './entities/shopping-list-item.entity';
import { Repository } from 'typeorm';
import { ShoppingList } from '../shopping-lists/entities/shopping-list.entity';

@Injectable()
export class ShoppingListItemsService {
  constructor(@InjectRepository(ShoppingListItem) private readonly repo: Repository<ShoppingListItem>) {}

  async create(createShoppingListItemDtos: CreateShoppingListItemDto[], shoppingList: ShoppingList) {
    const items = createShoppingListItemDtos.map((itemDto) => {
      const item = this.repo.create(itemDto);
      item.shoppingList = shoppingList;
      return item;
    });
    return this.repo.save(items);
  }

  findAll(shoppingList: ShoppingList) {
    return this.repo.find({ where: { shoppingList } });
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingListItem`;
  }

  update(id: number, updateShoppingListItemDto: UpdateShoppingListItemDto) {
    return `This action updates a #${id} shoppingListItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingListItem`;
  }
}
