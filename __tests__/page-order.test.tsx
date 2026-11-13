import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import Home from '@/app/page';

afterEach(() => cleanup());

describe('Page section order', () => {
  it('renders the sections in the playbook order', () => {
    render(<Home />);
    const text = document.body.textContent ?? '';
    const headings = [
      'your money.',
      'Nobody is watching what your agents cost.',
      'See the spend, know what it returned, then cut it.',
      'AI spend, categorized.',
      'The ROI of every agent.',
      'Make or buy, with numbers.',
      'Same work, cheaper route.',
      'Pro for more agents.',
      'Before you start.',
    ];
    const indices = headings.map((h) => text.indexOf(h));
    indices.forEach((idx, i) =>
      expect(idx, headings[i]).toBeGreaterThanOrEqual(0),
    );
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
  });

  it('ends with the questions and the footer, with no closing call to action', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('#get-started')).toBeNull();
    expect(document.body.textContent ?? '').not.toContain('Then spend less.');
    const blocks = [
      ...container.querySelectorAll('main > section, main > footer'),
    ];
    expect(blocks.at(-2)?.id).toBe('faq');
    expect(blocks.at(-1)?.tagName).toBe('FOOTER');
  });

  it('has no line between sections, footer included', () => {
    const { container } = render(<Home />);
    const blocks = container.querySelectorAll('main > section, main > footer');
    expect(blocks.length).toBeGreaterThan(4);
    blocks.forEach((b) =>
      expect(b.className, b.id || b.tagName).not.toMatch(
        /(^|\s)border-(t|b|y)(\s|$)/,
      ),
    );
  });

  it('has a pricing section the top bar links to, and no How we start section', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('section#pricing')).not.toBeNull();
    expect(container.querySelector('a[href="#pricing"]')).not.toBeNull();
    expect(container.querySelector('#how-we-start')).toBeNull();
  });

  /* "wallet" left this list on 13 November 2026: wallets are a counter of the
   * plans, so the pricing section and the question about Pro name them. The
   * hero and the legal pages still never say it. */
  it('never uses the words the playbook bans in public copy', () => {
    render(<Home />);
    const text = (document.body.textContent ?? '').toLowerCase();
    for (const banned of [
      'neobank',
      ' bank',
      'banking',
      'optimiz',
      'platform',
      'skill',
    ]) {
      expect(text, banned).not.toContain(banned);
    }
  });

  it('says wallet only where the plans are described', () => {
    const { container } = render(<Home />);
    for (const block of container.querySelectorAll('main > section')) {
      if (block.id === 'pricing' || block.id === 'faq') continue;
      expect(block.textContent?.toLowerCase(), block.id).not.toContain(
        'wallet',
      );
    }
  });

  it('has no em dash anywhere on the page', () => {
    render(<Home />);
    expect(document.body.textContent ?? '').not.toContain('—');
  });

  it('has no ✦ glyph anywhere on the page', () => {
    render(<Home />);
    expect(document.body.textContent ?? '').not.toContain('✦');
  });
});
