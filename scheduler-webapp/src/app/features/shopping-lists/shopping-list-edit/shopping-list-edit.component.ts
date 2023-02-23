import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingListItemModel, ShoppingListModel } from '../models';
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { EntityFormControlsModel } from '@shared/models';
import { ShoppingLists } from '../state/shopping-lists.actions';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';

type ItemFormGroup = FormGroup<EntityFormControlsModel<ShoppingListItemModel>>;
type ItemsFormArray = FormArray<ItemFormGroup>;
type ItemsFormGroup = FormGroup<{ items: ItemsFormArray }>;

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  private static readonly INITIAL_EMPTY_FIELDS_COUNT = 3;

  @Select(ShoppingListsState.selectedShoppingList)
  private readonly selectedShoppingList$!: Observable<ShoppingListModel>;

  form?: ItemsFormGroup;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly fb: NonNullableFormBuilder,
    private readonly route: ActivatedRoute,
  ) {}

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
    this.addInitialFields();
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

    const removeShoppingListItemsIds = this.store
      .selectSnapshot(ShoppingListsState.selectedShoppingList)
      .items.filter((savedItem) => {
        const formItem = this.formItems.find((formItem) => formItem.id === savedItem.id);

        const notExistInForm = !formItem;
        const isEmpty = formItem && !formItem.name;
        const isNotCreated = formItem && formItem.id > 0;

        return notExistInForm || (isEmpty && isNotCreated);
      })
      .map((item) => item.id);

    // todo: if all arrays are empty, that means nothing changed - don't send request and show toast

    this.store
      .dispatch(
        new ShoppingLists.UpdateShoppingListItems({
          createShoppingListItemDtos,
          updateShoppingListItemDtos,
          removeShoppingListItemsIds,
        }),
      )
      .subscribe({
        complete: () => {
          this.store.dispatch(new Navigate(['details'], {}, { relativeTo: this.route.parent }));
        },
      });
  }

  private createForm(shoppingList: ShoppingListModel): ItemsFormGroup {
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

  private addInitialFields(): void {
    for (let i = 0; i < ShoppingListEditComponent.INITIAL_EMPTY_FIELDS_COUNT; i++) {
      this.onClickAdd();
    }
  }
}
