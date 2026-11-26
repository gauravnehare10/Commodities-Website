import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { getCategory } from '~/content';
import { MaterialTable } from './MaterialTable';

function setup() {
  const category = getCategory('non-ferrous-metals')!;
  const Stub = createRoutesStub([
    { path: '/', Component: () => <MaterialTable category={category} /> },
  ]);
  render(<Stub initialEntries={['/']} />);
  return category;
}

const rowCount = () => within(screen.getByRole('table')).getAllByRole('row').length - 1; // minus header

describe('MaterialTable', () => {
  it('renders every active material by default (works without JS)', () => {
    const category = setup();
    expect(rowCount()).toBe(category.materials.filter((m) => m.active).length);
  });

  it('filters by sub-group chip and exposes pressed state', async () => {
    setup();
    const chip = screen.getByRole('button', { name: /^Aluminium/ });
    await userEvent.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(rowCount()).toBe(3);
  });

  it('searches and shows an empty state with a quote link', async () => {
    setup();
    await userEvent.type(screen.getByRole('searchbox'), 'zzzz');
    expect(await screen.findByText('No matching material.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tell us what you have/i })).toHaveAttribute(
      'href',
      '/quote?intent=sell&category=non-ferrous-metals',
    );
  });

  it('pre-fills the quote link per material', () => {
    setup();
    expect(screen.getByRole('link', { name: /quote for brass/i })).toHaveAttribute(
      'href',
      '/quote?intent=sell&category=non-ferrous-metals&material=brass',
    );
  });
});
