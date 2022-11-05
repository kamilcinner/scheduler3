import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ShoppingListItemModel } from '../models/shopping-list-item.model';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListItemComponent {
  @Input() item!: ShoppingListItemModel;
}
