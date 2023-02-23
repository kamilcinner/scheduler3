import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, map, Subject, takeUntil } from 'rxjs';
import { ShoppingListItemModel } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedShoppingListItemsActions, selectSelectedShoppingListItems } from '../state';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss'],
})
export class ShoppingListDetailsComponent implements OnInit, OnDestroy {
  readonly vm$: Observable<{ selectedShoppingListItems: ShoppingListItemModel[] }>;

  private readonly selectedShoppingListItems$: Observable<ShoppingListItemModel[]>;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly socket: Socket,
  ) {
    this.selectedShoppingListItems$ = this.store.select(selectSelectedShoppingListItems);
    this.vm$ = combineLatest([this.selectedShoppingListItems$]).pipe(
      map(([selectedShoppingListItems]) => ({ selectedShoppingListItems })),
    );
  }

  ngOnInit(): void {
    this.socket
      .fromEvent('message')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((messages) => console.log(messages));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClickItem(item: ShoppingListItemModel): void {
    this.store.dispatch(SelectedShoppingListItemsActions.toggleItemBought({ id: item.id }));
  }

  async onClickEdit(): Promise<void> {
    await this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onClickSendMessage(): void {
    this.socket.emit('message', { ula: 'ula' });
  }
}
