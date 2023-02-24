import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingListItemModel } from '../models';
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  SelectedShoppingListItemsActions,
  selectSelectedShoppingListItems,
} from '../state';
import { EntityFormControlsModel } from '@rennic/commons';

type ItemFormGroup = FormGroup<EntityFormControlsModel<ShoppingListItemModel>>;
type ItemsFormArray = FormArray<ItemFormGroup>;
type ItemsFormGroup = FormGroup<{ items: ItemsFormArray }>;

@Component({
  selector: 'rennic-shopping-lists-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  private static readonly INITIAL_EMPTY_FIELDS_COUNT = 3;

  form?: ItemsFormGroup;

  private readonly selectedShoppingListItems$: Observable<
    ShoppingListItemModel[]
  >;
  private readonly idsToRemove: number[] = [];
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly fb: NonNullableFormBuilder
  ) {
    this.selectedShoppingListItems$ = this.store.select(
      selectSelectedShoppingListItems
    );
  }

  private get formItemsArray(): ItemsFormArray | undefined {
    return this.form?.controls.items;
  }

  private get formItems(): ShoppingListItemModel[] {
    return this.form?.controls.items.getRawValue() ?? [];
  }

  ngOnInit(): void {
    this.selectedShoppingListItems$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((selectedShoppingList) => {
        this.form = this.createForm(selectedShoppingList);
      });
    this.addInitialFields();
  }

  onClickRemove(itemFormGroupIndex: number): void {
    const itemIdToRemove =
      this.form?.controls.items.at(itemFormGroupIndex)?.value.id;
    if (itemIdToRemove != null && itemIdToRemove !== -1) {
      this.idsToRemove.push(itemIdToRemove);
    }
    this.form?.controls.items.removeAt(itemFormGroupIndex);
  }

  onClickAdd(): void {
    this.form?.controls.items.push(
      this.fb.group({
        id: this.fb.control(-1),
        name: this.fb.control(''),
        bought: this.fb.control(false),
      })
    );
  }

  onSubmit(): void {
    const createShoppingListItemDtos = this.formItems
      .filter((item) => item.id === -1 && item.name)
      .map(({ name }) => ({ name }));

    const updateShoppingListItemDtos =
      this.formItemsArray?.controls
        .filter((itemFormGroup) => {
          const isNotCreated = itemFormGroup.controls.id.value > 0;
          const isModified = itemFormGroup.dirty;
          const isNotEmpty = !!itemFormGroup.controls.name.value;

          return isNotCreated && isModified && isNotEmpty;
        })
        .map((itemFormGroup) => itemFormGroup.getRawValue())
        .map(({ name }) => ({ name, bought: false })) ?? [];

    // todo: if all arrays are empty, that means nothing changed - don't send request and show toast

    this.store.dispatch(
      SelectedShoppingListItemsActions.updateItems({
        dto: {
          createShoppingListItemDtos,
          updateShoppingListItemDtos,
          removeShoppingListItemsIds: this.idsToRemove,
        },
      })
    );
  }

  private createForm(
    selectedShoppingListItems: ShoppingListItemModel[]
  ): ItemsFormGroup {
    return this.fb.group({
      items: this.fb.array(
        selectedShoppingListItems.map((item) =>
          this.fb.group({
            id: this.fb.control(item.id),
            name: this.fb.control(item.name),
            bought: this.fb.control(item.bought),
          })
        )
      ),
    });
  }

  private addInitialFields(): void {
    for (
      let i = 0;
      i < ShoppingListEditComponent.INITIAL_EMPTY_FIELDS_COUNT;
      i++
    ) {
      this.onClickAdd();
    }
  }
}
