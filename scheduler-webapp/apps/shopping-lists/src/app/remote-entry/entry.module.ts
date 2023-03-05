import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { ShoppingListsDataAccessModule } from '@rennic/shopping-lists/data-access';
import { ShoppingListsFeaturesModule } from '@rennic/shopping-lists/features';
import { API_URL } from '@rennic/shared/services';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [RouterModule.forChild(remoteRoutes), ShoppingListsDataAccessModule, ShoppingListsFeaturesModule],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
  ],
})
export class RemoteEntryModule {}
