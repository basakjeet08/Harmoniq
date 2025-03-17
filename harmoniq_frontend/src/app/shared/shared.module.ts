import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorCardComponent,
    LoaderComponent,
    HeaderComponent,
    InputComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoaderComponent,
    ErrorCardComponent,
    HeaderComponent,
    InputComponent,
  ],
})
export class SharedModule {}
