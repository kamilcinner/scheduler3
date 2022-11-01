import { TestBed, async } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListsState } from './shopping-lists.state';

describe('ShoppingLists actions', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShoppingListsState])],
    }).compileComponents();
  }));
});
