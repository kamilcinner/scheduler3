import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListItemsController } from './shopping-list-items.controller';
import { ShoppingListItemsService } from './shopping-list-items.service';

describe('ShoppingListItemsController', () => {
  let controller: ShoppingListItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListItemsController],
      providers: [ShoppingListItemsService],
    }).compile();

    controller = module.get<ShoppingListItemsController>(ShoppingListItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
