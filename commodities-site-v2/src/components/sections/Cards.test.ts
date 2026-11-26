import { describe, expect, it } from 'vitest';
import { gridColumns } from './Cards';

describe('gridColumns', () => {
  it('fills every desktop row when the count divides evenly', () => {
    expect(gridColumns(8)).toBe(4);
    expect(gridColumns(4)).toBe(4);
    expect(gridColumns(6)).toBe(3);
    expect(gridColumns(3)).toBe(3);
    expect(gridColumns(9)).toBe(3);
  });

  it('uses two wide cards for one or two items', () => {
    expect(gridColumns(1)).toBe(2);
    expect(gridColumns(2)).toBe(2);
  });

  it('otherwise picks the layout with the fuller last row', () => {
    expect(gridColumns(7)).toBe(4); // 4 + 3, not 3 + 3 + 1
    expect(gridColumns(5)).toBe(3); // 3 + 2, not 4 + 1
  });
});
