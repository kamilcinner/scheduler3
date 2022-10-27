import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from '../../shopping-list-items/entities/shopping-list-item.entity';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column() lastEditDateTime: Date;

  @OneToMany(() => ShoppingListItem, (shoppingListItem) => shoppingListItem.shoppingList)
  shoppingListItems: ShoppingListItem[];

  constructor() {
    this.lastEditDateTime = new Date();
  }
}
