import { trigger, style, transition, animate } from '@angular/animations';

// This is the animation to slide down a loader and then push them back when finished
export const slideDownAndUpAnimation = trigger('slideDownAndUpAnimation', [
  // Entry Animation - Slide Down
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-24px)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0px)' })
    ),
  ]),

  // Exit Animation - Slide Up
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0px)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 0, transform: 'translateY(-24px)' })
    ),
  ]),
]);
