import { isDevMode, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SocketIoModule } from 'ngx-socket-io';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CoreModule } from '@rennic/core';
import { SharedMaterialModule } from '@rennic/shared/material';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavComponent],
  imports: [
    CoreModule,
    SharedMaterialModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),

    SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} }),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
