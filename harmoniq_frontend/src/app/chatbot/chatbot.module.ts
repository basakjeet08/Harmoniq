import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConversationListComponent } from './pages/conversation-list/conversation-list.component';
import { ConversationDetailsComponent } from './pages/conversation-details/conversation-details.component';

// These are the routes for the chatbot module
const chatbotRoutes: Routes = [
  {
    path: '',
    component: ChatbotComponent,
    children: [
      { path: '', redirectTo: 'conversation-list', pathMatch: 'full' },
      { path: 'conversation-list', component: ConversationListComponent },
      {
        path: 'conversation-details/:id',
        component: ConversationDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ChatbotComponent,
    ConversationListComponent,
    ConversationDetailsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(chatbotRoutes), SharedModule],
})
export class ChatbotModule {}
