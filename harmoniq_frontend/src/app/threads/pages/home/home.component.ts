import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // This is the user details variable
  isGuest: boolean = false;

  // loading and Error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the user data and checking if the user is a guest user
  ngOnInit(): void {
    this.isGuest = this.profileService.getUser()?.role === Roles.GUEST;
  }

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
