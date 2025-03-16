import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [ErrorCardComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, ErrorCardComponent],
})
export class SharedModule {}
