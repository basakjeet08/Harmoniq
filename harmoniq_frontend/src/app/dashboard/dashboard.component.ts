import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/Models/user/UserDto';
import { AuthService } from '../shared/services/auth.service';
import { Roles } from '../shared/Models/user/Roles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // This contains the user data for the current profile
  userData: UserDto | undefined;
  isGuest: boolean = false;

  // injecting the necessary dependencies and fetching the user details
  constructor(private authService: AuthService) {}

  // Checking if the user is a guest user or not
  ngOnInit(): void {
    this.userData = this.authService.getUser();
    this.isGuest = this.userData?.role === Roles.GUEST;
  }
}
