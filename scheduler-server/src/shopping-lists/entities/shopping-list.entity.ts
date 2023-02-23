import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingListItem } from './shopping-list-item.entity';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column() lastEditDateTime: Date;

  @OneToMany(() => ShoppingListItem, (item) => item.shoppingList)
  items: ShoppingListItem[];

  constructor() {
    this.lastEditDateTime = new Date();
  }
}
