import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the chatbot module
const chatbotRoutes: Routes = [{ path: '', component: ChatbotComponent }];

@NgModule({
  declarations: [ChatbotComponent],
  imports: [CommonModule, RouterModule.forChild(chatbotRoutes)],
})
export class ChatbotModule {}
