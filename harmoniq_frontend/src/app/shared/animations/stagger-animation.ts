import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

// This is created for staggered list animation
export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(50px) scale(1.2)' }),
        stagger('200ms', [
          animate(
            '500ms ease-in-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
