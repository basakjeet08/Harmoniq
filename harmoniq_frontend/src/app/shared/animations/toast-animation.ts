import { trigger, transition, style, animate } from '@angular/animations';

export const toastAnimation = trigger('toastAnimation', [
  // Enter Animation - fade in and slide up
  transition(':enter', [
    style({ transform: 'translateY(40px)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),

  // Exit Animation - Fade out and slide up
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({ transform: 'translateY(-40px)', opacity: 0 })
    ),
  ]),
]);
