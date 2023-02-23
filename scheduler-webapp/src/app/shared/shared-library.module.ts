import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [CommonModule, MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule],
})
export class SharedLibraryModule {}
