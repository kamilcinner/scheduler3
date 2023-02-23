import { Module } from '@nestjs/common';
import { ShoppingListsService } from './shopping-lists.service';
import { ShoppingListsController } from './shopping-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList, ShoppingListItem } from './entities';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { ShoppingListItemsGateway } from './shopping-list-items.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList, ShoppingListItem])],
  controllers: [ShoppingListsController],
  providers: [ShoppingListsService, ShoppingListItemsService, ShoppingListItemsGateway],
})
export class ShoppingListsModule {}
