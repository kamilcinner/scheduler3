import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@core/components/header/header.component';
import { SidenavComponent } from '@core/components/sidenav/sidenav.component';
import { SharedModule } from '@shared/shared.module';
import { LanguageModule } from '@core/language.module';
import { StoreModule } from '@core/store.module';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [HttpClientModule, SharedModule, LanguageModule, StoreModule],
  exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
