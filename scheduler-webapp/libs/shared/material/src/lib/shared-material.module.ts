import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLineModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
  ],
})
export class SharedMaterialModule {}
