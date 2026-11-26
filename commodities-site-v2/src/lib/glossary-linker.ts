import type { GlossaryEntry } from '~/content/model';

export type GlossarySegment = string | { text: string; entry: GlossaryEntry };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Short forms with 2+ capitals (HMS, OA, CoD, POPs) must match case exactly. */
export const isAcronym = (s: string) =>
  /^[A-Za-z]{1,5}$/.test(s) && (s.match(/[A-Z]/g)?.length ?? 0) >= 2;

export function buildMatcher(entries: GlossaryEntry[]) {
  const forms = entries.flatMap((entry) =>
    [entry.term, ...entry.aliases].map((form) => ({ form, entry })),
  );
  if (forms.length === 0) return null;
  // Longest first so "Non-ferrous" wins over "Ferrous" and "Heavy Melting Scrap" over "HMS".
  forms.sort((a, b) => b.form.length - a.form.length);
  const regex = new RegExp(
    `(?<![\\w-])(?:${forms.map((f) => escape(f.form)).join('|')})(?![\\w-])`,
    'gi',
  );
  const lookup = new Map(forms.map((f) => [f.form.toLowerCase(), f]));
  return { regex, lookup };
}

/**
 * Splits text into plain strings and glossary matches.
 * Each term is linked at most once per text block (first occurrence) to avoid link overload.
 */
export function linkGlossary(text: string, entries: GlossaryEntry[]): GlossarySegment[] {
  const matcher = buildMatcher(entries);
  if (!matcher) return [text];
  const out: GlossarySegment[] = [];
  const seen = new Set<string>();
  let last = 0;
  for (const m of text.matchAll(matcher.regex)) {
    const hit = matcher.lookup.get(m[0].toLowerCase());
    if (!hit || m.index === undefined) continue;
    if (isAcronym(hit.form) && m[0] !== hit.form) continue;
    if (seen.has(hit.entry.slug)) continue;
    seen.add(hit.entry.slug);
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ text: m[0], entry: hit.entry });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
