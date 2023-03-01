import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListsBrowseComponent } from './shopping-lists-browse.component';

describe('ShoppingListsBrowseComponent', () => {
  let component: ShoppingListsBrowseComponent;
  let fixture: ComponentFixture<ShoppingListsBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListsBrowseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListsBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
