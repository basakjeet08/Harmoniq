import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the Auth Components
const authRoutes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule.forChild(authRoutes)],
})
export class AuthModule {}
