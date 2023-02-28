import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListCreateComponent } from './shopping-list-create/shopping-list-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@rennic/shared/material';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule],
  declarations: [ShoppingListCreateComponent],
  exports: [ShoppingListCreateComponent],
})
export class ShoppingListsFeatureCreateModule {}
