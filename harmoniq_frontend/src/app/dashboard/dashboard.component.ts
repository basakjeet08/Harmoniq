import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/Models/user/UserDto';
import { Roles } from '../shared/Models/user/Roles';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // This contains the user data for the current profile
  userData: UserDto | undefined;
  isGuest: boolean = false;

  // injecting the necessary dependencies
  constructor(private profileService: ProfileService) {}

  // Checking if the user is a guest user or not
  ngOnInit(): void {
    this.userData = this.profileService.getUser();
    this.isGuest = this.userData?.role === Roles.GUEST;
  }
}
