import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShoppingListModel } from '../models/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent {
  @Input() shoppingList!: ShoppingListModel;
}
