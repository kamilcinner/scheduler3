import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [CommonModule, MaterialModule, TranslateModule],
})
export class SharedLibraryModule {}
