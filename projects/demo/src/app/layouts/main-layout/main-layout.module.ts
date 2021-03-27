import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  exports: [MainLayoutComponent],
  declarations: [MainLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class MainLayoutModule {}
