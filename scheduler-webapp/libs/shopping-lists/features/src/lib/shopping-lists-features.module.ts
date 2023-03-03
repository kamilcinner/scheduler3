import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListsBrowseComponent } from './shopping-lists-browse/shopping-lists-browse.component';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMaterialModule } from '@rennic/shared/material';

@NgModule({
  declarations: [
    ShoppingListsBrowseComponent,
    ShoppingListCreateComponent,
    ShoppingListDetailsComponent,
    ShoppingListEditComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, SharedMaterialModule],
  exports: [
    ShoppingListsBrowseComponent,
    ShoppingListCreateComponent,
    ShoppingListDetailsComponent,
    ShoppingListEditComponent,
  ],
})
export class ShoppingListsFeaturesModule {}
