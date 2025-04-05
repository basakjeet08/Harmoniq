import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideLeftSubtleAnimation } from 'src/app/shared/animations/slide-left-subtle-animation';
import { slideRightSubtleAnimation } from 'src/app/shared/animations/slide-right-subtle-animation';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideLeftSubtleAnimation, slideRightSubtleAnimation],
})
export class HomeComponent implements OnInit {
  // This is the user details variable
  isGuest: boolean = false;

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
}
