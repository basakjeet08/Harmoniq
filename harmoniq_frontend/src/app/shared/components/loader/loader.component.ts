import { Component, Input } from '@angular/core';
import { slideDownAndUpAnimation } from '../animations/slide-down-animation';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [slideDownAndUpAnimation],
})
export class LoaderComponent {
  // This variable stores if the loader should be visible or not
  @Input('isLoading') isLoading: boolean = false;
}
