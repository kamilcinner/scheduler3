import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@env';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
      collapsed: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
    }),
  ],
})
export class CoreModule {}
