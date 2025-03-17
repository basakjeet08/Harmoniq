import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelplinesComponent } from './helplines.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the helplines module
const helplinesRoutes: Routes = [{ path: '', component: HelplinesComponent }];

@NgModule({
  declarations: [HelplinesComponent],
  imports: [CommonModule, RouterModule.forChild(helplinesRoutes)],
})
export class HelplinesModule {}
