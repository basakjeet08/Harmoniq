import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

// These are the routes for the dashboard module
const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'chatbot', pathMatch: 'full' },
      {
        path: 'chatbot',
        loadChildren: () =>
          import('./../chatbot/chatbot.module').then((m) => m.ChatbotModule),
      },
      {
        path: 'threads',
        loadChildren: () =>
          import('./../threads/threads.module').then((m) => m.ThreadsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class DashboardModule {}
