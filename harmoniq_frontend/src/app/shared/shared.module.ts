import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { AvatarSelectorComponent } from './components/avatar-selector/avatar-selector.component';

@NgModule({
  declarations: [
    LoaderComponent,
    InputComponent,
    ToastComponent,
    AvatarSelectorComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoaderComponent,
    InputComponent,
    ToastComponent,
    AvatarSelectorComponent,
  ],
})
export class SharedModule {}
