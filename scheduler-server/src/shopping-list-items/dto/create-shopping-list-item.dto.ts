import { IsString } from 'class-validator';

export class CreateShoppingListItemDto {
  @IsString()
  name: string;
}
