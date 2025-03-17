import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadsComponent } from './threads.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the threads module
const threadRoutes: Routes = [{ path: '', component: ThreadsComponent }];

@NgModule({
  declarations: [ThreadsComponent],
  imports: [CommonModule, RouterModule.forChild(threadRoutes)],
})
export class ThreadsModule {}
