import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShoppingListsState } from '../state/shopping-lists.state';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingListItemModel, ShoppingListModel } from '../models';
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { EntityFormControlsModel } from '@shared/models';

type ItemsForm = FormGroup<{ items: FormArray<FormGroup<EntityFormControlsModel<ShoppingListItemModel>>> }>;

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  @Select(ShoppingListsState.selectedShoppingList)
  private readonly selectedShoppingList$!: Observable<ShoppingListModel>;

  // readonly vm$ = combineLatest([this.selectedShoppingList$]).pipe(
  //   map(([selectedShoppingList]) => ({ selectedShoppingList })),
  // );
  form?: ItemsForm;

  private readonly destroyed$ = new Subject<void>();
  private readonly idsToRemove: number[] = [];

  constructor(private readonly store: Store, private readonly fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.selectedShoppingList$.pipe(takeUntil(this.destroyed$)).subscribe((selectedShoppingList) => {
      this.form = this.createForm(selectedShoppingList);
    });
  }

  onClickRemove(item: ShoppingListItemModel, controlIndex: number): void {
    this.idsToRemove.push(item.id);
    this.form?.controls.items.removeAt(controlIndex);
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
