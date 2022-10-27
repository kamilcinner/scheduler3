import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingListsService {
  constructor(@InjectRepository(ShoppingList) private readonly repo: Repository<ShoppingList>) {}

  create(createShoppingListDto: CreateShoppingListDto) {
    const shoppingList = this.repo.create(createShoppingListDto);
    return this.repo.save(shoppingList);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateShoppingListDto: UpdateShoppingListDto) {
    const shoppingList = await this.findOne(id);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    Object.assign(shoppingList, updateShoppingListDto);
    return this.repo.save(shoppingList);
  }

  async remove(id: number) {
    const shoppingList = await this.findOne(id);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return this.repo.remove(shoppingList);
  }
}
