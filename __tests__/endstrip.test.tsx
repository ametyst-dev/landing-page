import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import EndStrip from '@/components/EndStrip';

afterEach(() => {
  cleanup();
});

describe('EndStrip', () => {
  it('renders X link with correct href', () => {
    render(<EndStrip />);
    expect(screen.getByRole('link', { name: 'X' })).toHaveAttribute(
      'href',
      'https://x.com/ametyst_ai',
    );
  });

  it('renders LinkedIn link with correct href', () => {
    render(<EndStrip />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/89660894/',
    );
  });

  it('links the legal pages and shows the company data in Italian', () => {
    render(<EndStrip />);
    for (const [name, href] of [
      ['Pricing', '/pricing'],
      ['Terms', '/terms'],
      ['Refunds', '/refunds'],
      ['Privacy', '/privacy'],
      ['Contact', '/contact'],
      ['Status', 'https://status.ametyst.ai/'],
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
    expect(
      screen.getByText(/AMETYST SRL · Corso Magenta 56/),
    ).toBeInTheDocument();
    expect(screen.getByText(/P\.IVA e C\.F\. 14681630969/)).toBeInTheDocument();
  });

  it('has no Product links, only the legal links and the two marks', () => {
    render(<EndStrip />);
    for (const name of ['Sign in', 'Book a call', 'Setup guide for agents'])
      expect(screen.queryByRole('link', { name })).toBeNull();
    expect(screen.getAllByRole('link')).toHaveLength(8);
  });

  it('opens Status in a new tab, last in the legal row', () => {
    render(<EndStrip />);
    const status = screen.getByRole('link', { name: 'Status' });
    expect(status).toHaveAttribute('target', '_blank');
    expect(status).toHaveAttribute('rel', 'noopener noreferrer');
    const legal = screen.getByRole('navigation', { name: 'Legal' });
    const links = legal.querySelectorAll('a');
    expect(links[links.length - 1]).toBe(status);
    expect(status.className).toBe(links[0].className);
  });

  it('has no brand block, no tagline and no line above it', () => {
    const { container } = render(<EndStrip />);
    expect(container.textContent).not.toContain('You have the agents');
    expect(screen.queryByRole('link', { name: 'Ametyst' })).toBeNull();
    expect(container.querySelector('footer')?.className).not.toMatch(
      /border-t/,
    );
  });
});
