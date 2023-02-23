import { isDevMode, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@core/components/header/header.component';
import { SidenavComponent } from '@core/components/sidenav/sidenav.component';
import { SharedModule } from '@shared/shared.module';
import { LanguageModule } from '@core/language.module';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '@env';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    LanguageModule,

    StoreModule.forRoot({
      router: routerReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    SocketIoModule.forRoot({ url: environment.API_URL, options: {} }),
  ],
  exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
