import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadsComponent } from './threads.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './pages/feed/feed.component';
import { AddComponent } from './pages/add/add.component';
import { HistoryComponent } from './pages/history/history.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ThreadCardComponent } from './components/thread-card/thread-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

// These are the routes for the threads module
const threadRoutes: Routes = [
  {
    path: '',
    component: ThreadsComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'details/:id', component: DetailsComponent },
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
    ThreadCardComponent,
    CommentCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(threadRoutes),
    SharedModule,
    FormsModule,
  ],
})
export class ThreadsModule {}
