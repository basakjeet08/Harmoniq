import { animate, style, transition, trigger } from '@angular/animations';

// This is the animation which scales up while having a fade effect along with it
export const scaleUpAnimation = trigger('scaleUpAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.65)' }),
    animate('300ms ease-in-out', style({ opacity: 1, transform: 'scale(1.0)' })),
  ]),
]);
