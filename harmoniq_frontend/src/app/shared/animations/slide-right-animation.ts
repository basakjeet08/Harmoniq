import { animate, style, transition, trigger } from '@angular/animations';

// This function provides a nice slide in to the right effect with the fade effect with it
export const slideRightAnimation = trigger('slideRightAnimation', [
  transition(':enter', [
    style({ opacity: 1, transform: 'translateX(-100%)' }),
    animate('500ms 100ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);
