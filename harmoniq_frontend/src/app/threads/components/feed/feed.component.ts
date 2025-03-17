import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  // This function is invoked when the user clicks on the search button
  onSearchClick(searchInput: string) {
    console.log(searchInput);
  }
}
