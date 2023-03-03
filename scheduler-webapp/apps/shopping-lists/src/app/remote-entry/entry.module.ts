import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { ShoppingListsDataAccessModule } from '@rennic/shopping-lists/data-access';
import { ShoppingListsFeaturesModule } from '@rennic/shopping-lists/features';

@NgModule({
  imports: [RouterModule.forChild(remoteRoutes), ShoppingListsDataAccessModule, ShoppingListsFeaturesModule],
})
export class RemoteEntryModule {}
