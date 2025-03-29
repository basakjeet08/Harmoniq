import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { guestGuard } from '../shared/guards/guest.guard';

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
        canActivate: [guestGuard],
      },
      {
        path: 'threads',
        loadChildren: () =>
          import('./../threads/threads.module').then((m) => m.ThreadsModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes), SharedModule],
})
export class DashboardModule {}
