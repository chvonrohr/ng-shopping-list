import { NgModule } from '@angular/core';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PlaceholderDirective,
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent
  ]
})
export class SharedModule {}
