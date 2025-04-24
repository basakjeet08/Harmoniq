import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Injecting the required dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // This function is invoked when the user clicks on the get started button
  onGetStartedClick(): void {
    this.router
      .navigate(['../', 'conversation-list'], {
        relativeTo: this.route,
      })
      .then();
  }
}
