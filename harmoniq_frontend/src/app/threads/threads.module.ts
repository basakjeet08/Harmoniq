import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadsComponent } from './threads.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { AddComponent } from './components/add/add.component';
import { HistoryComponent } from './components/history/history.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

// These are the routes for the threads module
const threadRoutes: Routes = [
  {
    path: '',
    component: ThreadsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'add', component: AddComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ThreadsComponent,
    FeedComponent,
    AddComponent,
    HistoryComponent,
    DetailsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(threadRoutes),
    SharedModule,
    FormsModule,
  ],
})
export class ThreadsModule {}
