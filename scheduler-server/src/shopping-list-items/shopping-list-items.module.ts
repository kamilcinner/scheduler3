import { Module } from '@nestjs/common';
import { ShoppingListItemsService } from './shopping-list-items.service';
import { ShoppingListItemsController } from './shopping-list-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListItem } from './entities/shopping-list-item.entity';
import { ShoppingListsModule } from '../shopping-lists/shopping-lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingListItem]), ShoppingListsModule],
  controllers: [ShoppingListItemsController],
  providers: [ShoppingListItemsService],
})
export class ShoppingListItemsModule {}
