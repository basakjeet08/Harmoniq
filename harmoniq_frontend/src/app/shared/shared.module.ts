import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [ErrorCardComponent, LoaderComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, ErrorCardComponent, HeaderComponent],
})
export class SharedModule {}
