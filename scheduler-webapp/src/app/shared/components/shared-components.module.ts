import { NgModule } from '@angular/core';
import { SharedLibraryModule } from '@shared/shared-library.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [SharedLibraryModule, MaterialModule],
})
export class SharedComponentsModule {}
