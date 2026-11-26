import { describe, expect, it } from 'vitest';
import { glossary } from '~/content';
import { isAcronym, linkGlossary } from './glossary-linker';

const terms = (text: string) =>
  linkGlossary(text, glossary)
    .filter((s): s is Exclude<typeof s, string> => typeof s !== 'string')
    .map((s) => s.entry.slug);

describe('linkGlossary', () => {
  it('links acronyms with exact case only', () => {
    expect(terms('HMS is graded.')).toEqual(['hms']);
    expect(terms('hms is graded.')).toEqual([]);
  });

  it('prefers the longest match (Non-ferrous over Ferrous)', () => {
    expect(terms('Non-ferrous metals')).toEqual(['non-ferrous']);
  });

  it('matches multi-word terms case-insensitively', () => {
    expect(terms('The waste Duty of Care applies.')).toEqual(['duty-of-care']);
  });

  it('links each term once per block', () => {
    expect(terms('OA and more OA')).toEqual(['oa']);
  });

  it('does not match inside words', () => {
    expect(terms('BOAT LOAD')).toEqual([]);
  });

  it('preserves the full text', () => {
    const text = 'Sort HMS from OA before weighing.';
    const joined = linkGlossary(text, glossary)
      .map((s) => (typeof s === 'string' ? s : s.text))
      .join('');
    expect(joined).toBe(text);
  });
});

describe('isAcronym', () => {
  it.each([
    ['HMS', true],
    ['CoD', true],
    ['POPs', true],
    ['Swarf', false],
    ['Duty of care', false],
  ])('%s → %s', (input, expected) => expect(isAcronym(input)).toBe(expected));
});
