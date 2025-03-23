import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    InputComponent,
    ToastComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [LoaderComponent, HeaderComponent, InputComponent, ToastComponent],
})
export class SharedModule {}
