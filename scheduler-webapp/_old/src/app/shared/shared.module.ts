import { NgModule } from '@angular/core';
import { SharedLibraryModule } from './shared-library.module';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  exports: [SharedLibraryModule, SharedComponentsModule],
})
export class SharedModule {}
