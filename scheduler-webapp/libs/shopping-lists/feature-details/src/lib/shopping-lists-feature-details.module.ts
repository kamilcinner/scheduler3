import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { SharedMaterialModule } from '@rennic/shared/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, TranslateModule],
  declarations: [ShoppingListDetailsComponent],
  exports: [ShoppingListDetailsComponent],
})
export class ShoppingListsFeatureDetailsModule {}
