import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingListItemModel, ShoppingListModel } from '../models';
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { EntityFormControlsModel } from '@shared/models';
import { ShoppingLists } from '../state/shopping-lists.actions';

type ItemsFormArray = FormArray<FormGroup<EntityFormControlsModel<ShoppingListItemModel>>>;
type ItemsForm = FormGroup<{ items: ItemsFormArray }>;

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  @Select(ShoppingListsState.selectedShoppingList)
  private readonly selectedShoppingList$!: Observable<ShoppingListModel>;

  form?: ItemsForm;

  private readonly destroyed$ = new Subject<void>();

  constructor(private readonly store: Store, private readonly fb: NonNullableFormBuilder) {}

  private get formItemsArray(): ItemsFormArray | undefined {
    return this.form?.controls.items;
  }

  private get formItems(): ShoppingListItemModel[] {
    return this.form?.controls.items.getRawValue() ?? [];
  }

  ngOnInit(): void {
    this.selectedShoppingList$.pipe(takeUntil(this.destroyed$)).subscribe((selectedShoppingList) => {
      this.form = this.createForm(selectedShoppingList);
    });
  }

  onClickRemove(itemFormGroupIndex: number): void {
    this.form?.controls.items.removeAt(itemFormGroupIndex);
  }

  onClickAdd(): void {
    this.form?.controls.items.push(
      this.fb.group({
        id: this.fb.control(-1),
        name: this.fb.control(''),
        bought: this.fb.control(false),
      }),
    );
  }

  onSubmit(): void {
    const createdShoppingListItems = this.formItems.filter((item) => item.id === -1);

    const updatedShoppingListItems =
      this.formItemsArray?.controls
        .filter((itemGroup) => itemGroup.controls.id.value > 0 && itemGroup.dirty)
        .map((itemGroup) => itemGroup.getRawValue()) ?? [];

    const removedShoppingListItemsIds = this.store
      .selectSnapshot(ShoppingListsState.selectedShoppingList)
      .items.filter((item) => !this.formItems.some((formItem) => formItem.id === item.id))
      .map((item) => item.id);

    this.store.dispatch(
      new ShoppingLists.UpdateShoppingListItems(
        createdShoppingListItems,
        updatedShoppingListItems,
        removedShoppingListItemsIds,
      ),
    );
  }

  private createForm(shoppingList: ShoppingListModel): ItemsForm {
    return this.fb.group({
      items: this.fb.array(
        shoppingList.items.map((item) =>
          this.fb.group({
            id: this.fb.control(item.id),
            name: this.fb.control(item.name),
            bought: this.fb.control(item.bought),
          }),
        ),
      ),
    });
  }
}
