import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { ShoppingListsDataAccessModule } from '@rennic/shopping-lists/data-access';
import { ShoppingListsFeatureBrowseModule } from '@rennic/shopping-lists/feature-browse';
import { ShoppingListsFeatureDetailsModule } from '@rennic/shopping-lists/feature-details';
import { ShoppingListsFeatureEditModule } from '@rennic/shopping-lists/feature-edit';
import { ShoppingListsFeatureCreateModule } from '@rennic/shopping-lists/feature-create';

@NgModule({
  imports: [
    RouterModule.forChild(remoteRoutes),

    ShoppingListsDataAccessModule,
    ShoppingListsFeatureBrowseModule,
    ShoppingListsFeatureDetailsModule,
    ShoppingListsFeatureEditModule,
    ShoppingListsFeatureCreateModule,
  ],
})
export class RemoteEntryModule {}
