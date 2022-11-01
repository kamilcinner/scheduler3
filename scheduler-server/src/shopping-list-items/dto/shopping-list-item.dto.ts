import { Expose, Transform } from 'class-transformer';

export class ShoppingListItemDto {
  @Expose() id: number;
  @Expose() name: string;

  // @Expose()
  // @Transform(({ obj }) => obj.shoppingList.id)
  // shoppingListId: number;
}
