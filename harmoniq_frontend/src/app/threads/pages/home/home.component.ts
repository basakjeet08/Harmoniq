import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // loading and Error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks on the navigate to feed card
  onNavigateToFeedClick() {
    this.router.navigate(['../', 'feed'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the Post a thread card
  onPostThreadClick() {
    this.router.navigate(['../', 'add'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the view Thread History Card
  onViewHistoryClick() {
    this.router.navigate(['../', 'history'], { relativeTo: this.route });
  }

  // This funciton is invoked when the error cancel button is clicked
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
