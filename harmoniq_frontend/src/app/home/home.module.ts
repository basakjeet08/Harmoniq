import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the home module
const homeRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
