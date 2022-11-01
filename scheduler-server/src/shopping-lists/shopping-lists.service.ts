import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingList } from './entities/shopping-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingListsService {
  constructor(@InjectRepository(ShoppingList) private readonly repo: Repository<ShoppingList>) {}

  create(dto: CreateShoppingListDto) {
    const shoppingList = this.repo.create(dto);
    return this.repo.save(shoppingList);
  }

  findAll() {
    return this.repo.find();
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async updateById(id: number, dto: UpdateShoppingListDto) {
    const shoppingList = await this.findOneById(id);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    Object.assign(shoppingList, dto);
    return this.repo.save(shoppingList);
  }

  async removeById(id: number) {
    const shoppingList = await this.findOneById(id);

    if (!shoppingList) {
      throw new NotFoundException('shopping list not found');
    }

    return this.repo.remove(shoppingList);
  }
}
