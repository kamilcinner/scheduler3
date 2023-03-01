import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListsBrowseComponent } from './shopping-lists-browse/shopping-lists-browse.component';
import { SharedMaterialModule } from '@rennic/shared/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, TranslateModule],
  declarations: [ShoppingListsBrowseComponent],
  exports: [ShoppingListsBrowseComponent],
})
export class ShoppingListsFeatureBrowseModule {}
