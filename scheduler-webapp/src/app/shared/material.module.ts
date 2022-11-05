import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';

@NgModule({
  exports: [MatListModule, MatLineModule],
})
export class MaterialModule {}
