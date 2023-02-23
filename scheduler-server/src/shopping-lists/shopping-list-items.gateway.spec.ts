import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListItemsGateway } from './shopping-list-items.gateway';

describe('ShoppingListItemsGateway', () => {
  let gateway: ShoppingListItemsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListItemsGateway],
    }).compile();

    gateway = module.get<ShoppingListItemsGateway>(ShoppingListItemsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
