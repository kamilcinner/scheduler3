import { IsDate, IsString } from 'class-validator';

export class CreateShoppingListDto {
  @IsString()
  name: string;

  // @IsDate()
}
