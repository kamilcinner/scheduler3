import { Expose } from 'class-transformer';

export class ShoppingListDto {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() lastEditDateTime: Date;
}
