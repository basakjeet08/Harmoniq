import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Injecting the necessary dependencies
  constructor(private authService: AuthService, private router: Router) {}

  // This function is invoked when the user clicks the logout button
  onLogoutClick() {
    // Clearing out the cache of the current user data and navigating back to login page
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
