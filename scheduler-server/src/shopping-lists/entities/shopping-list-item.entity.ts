import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingList } from './shopping-list.entity';

@Entity()
export class ShoppingListItem {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items)
  shoppingList: ShoppingList;
}
