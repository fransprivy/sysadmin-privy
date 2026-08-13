import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The Figma type ramp adds custom font sizes (text-p1, text-h6, …) that collide
 * with text colours in tailwind-merge's default `text-` group — without this,
 * cn('text-link', 'text-p2') would silently drop the colour.
 */
const FONT_SIZES = ['caption2', 'caption1', 'p2', 'p1', 'b1', 'h6'];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
