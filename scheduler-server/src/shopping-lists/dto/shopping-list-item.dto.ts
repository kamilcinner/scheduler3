import { Expose } from 'class-transformer';

export class ShoppingListItemDto {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() bought: boolean;
}
