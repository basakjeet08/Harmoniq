import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

// This is created for staggered list animation
export const staggerPopAnimation = trigger('staggerPopAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0.6)' }),
        stagger('100ms', [
          animate(
            '500ms ease-in-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
