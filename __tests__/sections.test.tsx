import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Pricing, { PlanCards, PlansTable } from '@/components/Pricing';
import Cta from '@/components/Cta';
import Pillars from '@/components/Pillars';
import Faq from '@/components/Faq';
import PricingPage from '@/app/pricing/page';

afterEach(() => cleanup());

describe('TopBar', () => {
  it('has the two CTAs and a Pricing link to the section, no other section links and no Sign in', () => {
    render(<TopBar />);
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      'https://business.ametyst.ai',
    );
    expect(screen.getByRole('link', { name: 'Book a demo' })).toHaveAttribute(
      'href',
      '/book',
    );
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute(
      'href',
      '#pricing',
    );
    expect(screen.queryByRole('link', { name: 'How it works' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Use cases' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Sign in' })).toBeNull();
  });
});

describe('Hero', () => {
  it('renders the spend headline, both CTAs and the five harnesses', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'See what every agent does with your money.',
    );
    expect(screen.queryByText(/usage credits/)).toBeNull();
    expect(screen.getByRole('link', { name: 'Book a demo' })).toHaveAttribute(
      'href',
      '/book',
    );
    for (const h of ['Claude Code', 'Codex', 'Cursor', 'OpenClaw', 'OpenCode'])
      expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      'https://business.ametyst.ai',
    );
  });

  it('has no demo under it', () => {
    render(<Hero />);
    expect(screen.queryByText(/Without the Ametyst Agent/)).toBeNull();
    expect(screen.queryByText(/With the Ametyst Agent/)).toBeNull();
  });

  it('does not list Hermes Agent', () => {
    render(<Hero />);
    expect(screen.queryByText(/Hermes/)).toBeNull();
  });

  it('never says wallet', () => {
    const { container } = render(<Hero />);
    expect(container.textContent?.toLowerCase()).not.toContain('wallet');
  });
});

describe('Problem', () => {
  it('names three pains, in the order the page answers them', () => {
    render(<Problem />);
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      'Nobody sees the whole picture.',
      'Nobody knows what it returned.',
      'Your agents overpay at every step.',
    ]);
  });
});

describe('PlansTable (home page and /pricing)', () => {
  it('shows two plans with their prices, no Enterprise, and the rows in three groups', () => {
    const { container } = render(<PlansTable />);
    const payPerUse = screen.getByRole('columnheader', { name: /Pay per use/ });
    expect(within(payPerUse).getByText('€0')).toBeInTheDocument();
    expect(within(payPerUse).getByText('no fixed fee')).toBeInTheDocument();
    const pro = screen.getByRole('columnheader', { name: /^Pro/ });
    expect(within(pro).getByText('€15')).toBeInTheDocument();
    expect(within(pro).getByText('per seat, per month')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /Enterprise|Custom|Sub-admins|Audit log|Coming soon|Skills/,
    );
    for (const group of [
      'Everything you need to monitor your AI and work with your agents',
      'Everything an AI-native company needs to run many agents',
      'Understand and improve your business with AI',
    ]) {
      expect(screen.getByText(group)).toBeInTheDocument();
    }
    const order = screen
      .getAllByRole('rowheader')
      .map((h) => h.textContent?.trim());
    expect(order).toEqual([
      'AI spend by provider, model, project, member and agent',
      'Unlimited members',
      '40+ models and tools from one wallet',
      'Spending policies',
      'Agents per member',
      'Wallets per member',
      'Savings advice',
      'ROI data to download',
      'Make-or-buy review with our team',
    ]);
  });

  it('gives Pay per use its limits and Pro everything', () => {
    render(<PlansTable />);
    const row = (name: string) =>
      screen.getByRole('rowheader', { name }).closest('tr')!;
    for (const [name, limit] of [
      ['Spending policies', '2'],
      ['Agents per member', '1'],
      ['Wallets per member', '1'],
      ['Savings advice', '5 a month'],
    ]) {
      expect(within(row(name)).getByText(limit)).toBeInTheDocument();
      expect(within(row(name)).getByText('Unlimited')).toBeInTheDocument();
    }
    for (const name of [
      'ROI data to download',
      'Make-or-buy review with our team',
    ]) {
      expect(
        within(row(name)).getByLabelText('Not included'),
      ).toBeInTheDocument();
      expect(within(row(name)).getByLabelText('Included')).toBeInTheDocument();
    }
    expect(
      within(row('Unlimited members')).getAllByLabelText('Included'),
    ).toHaveLength(2);
  });

  it('says what is free in its corner only when asked to', () => {
    const { container, rerender } = render(<PlansTable />);
    expect(container.textContent).not.toContain('Opening a workspace is free');
    rerender(<PlansTable lead />);
    expect(container.textContent).toContain('Opening a workspace is free');
  });

  it('never uses stablecoin wording (wallets are a counter of the plans since 13 October 2026)', () => {
    const { container } = render(<PlansTable />);
    expect(container.textContent).not.toMatch(/usdc|stablecoin/i);
  });
});

describe('PlanCards (the plans on a phone)', () => {
  it('says the same two plans as the table', () => {
    const { container } = render(<PlanCards />);
    const text = (container.textContent ?? '').replace(/\s+/g, ' ');
    for (const said of [
      'Pay per use',
      '€0',
      '2 spending policies',
      '1 agent and 1 wallet per member',
      '5 savings advice a month',
      '€15',
      'Everything in Pay per use, plus',
      'Unlimited spending policies',
      'Unlimited agents per member',
      'Unlimited wallets per member',
      'Unlimited savings advice',
      'ROI data to download',
      'Make-or-buy review with our team',
    ]) {
      expect(text, said).toContain(said);
    }
    expect(text).not.toMatch(/Enterprise|Sub-admins|Coming soon/);
  });
});

describe('Pricing (the section on the home page)', () => {
  it('is the #pricing section, with the table for wide screens and the cards for a phone', () => {
    const { container } = render(<Pricing />);
    const section = container.querySelector('section#pricing')!;
    expect(section).not.toBeNull();
    expect(
      within(section as HTMLElement).getByRole('heading', { level: 2 }),
    ).toHaveTextContent('Free for the whole team. Pro for more agents.');
    expect(section.querySelector('.hidden.md\\:block table')).not.toBeNull();
    expect(section.querySelector('.md\\:hidden .grid')).not.toBeNull();
  });
});

describe('Pricing page (/pricing)', () => {
  it('says every person has one agent, their Personal, keeps the Pro paragraph and has no Enterprise', () => {
    const { container } = render(<PricingPage />);
    const text = (container.textContent ?? '').replace(/\s+/g, ' ');
    expect(text).toContain(
      'Every person has one agent, their Personal, with every skill they want',
    );
    expect(text).toContain('The workspace has two spending policies.');
    expect(text).toContain('unlimited agents, wallets and policies');
    expect(text).not.toMatch(/Enterprise|sub-admins|audit log/i);
  });
});

describe('Cta', () => {
  it('has no email form', () => {
    const { container } = render(<Cta />);
    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelector('input')).toBeNull();
  });
});

describe('Pillars', () => {
  it('has the spend dashboard first, then three cards built on it, with no step numbers in the titles', () => {
    render(<Pillars />);
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      'AI spend, categorized.',
      'The ROI of every agent.',
      'Make or buy, with numbers.',
      'Same work, cheaper route.',
    ]);
    expect(screen.getByText(/spending policy/)).toBeInTheDocument();
    expect(screen.getByText('From the same spend data')).toBeInTheDocument();
  });

  it('splits the spend by provider, model, project, member and agent', () => {
    render(<Pillars />);
    for (const split of ['Provider', 'Model', 'Project', 'Member', 'Agent'])
      expect(screen.getByRole('button', { name: split })).toBeInTheDocument();
    expect(screen.getByText('Spend by provider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Provider' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows spend and the cost of one result for every agent, with no hours saved', () => {
    const { container } = render(<Pillars />);
    for (const head of ['Spend', 'Cost of one'])
      expect(
        screen.getByRole('columnheader', { name: head }),
      ).toBeInTheDocument();
    expect(screen.getByText('€13.40')).toBeInTheDocument();
    expect(screen.getByText('Download CSV')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/hours saved/i);
  });

  it('shows one make-or-buy case each way and one cheaper route at a time', () => {
    render(<Pillars />);
    expect(screen.getByText('Make it: €890 less a month.')).toBeInTheDocument();
    expect(screen.getByText('Keep buying:')).toBeInTheDocument();
    expect(screen.getByText('GPT-5.6 Terra')).toBeInTheDocument();
    expect(screen.getAllByText('Cheaper route')).toHaveLength(1);
    expect(screen.getByText('Approve')).toBeInTheDocument();
  });
});

describe('Faq', () => {
  it('names OpenCode, not Hermes Agent, and says what does not work yet', () => {
    const { container } = render(<Faq />);
    expect(container.textContent).toContain(
      'OpenClaw, OpenCode and any MCP client',
    );
    expect(container.textContent).toContain(
      'It does not work yet with Claude Cowork and ChatGPT.',
    );
    expect(container.textContent).not.toMatch(/Hermes/);
  });

  it('answers with the five splits of the dashboard, 40+ models and tools, and when Pro is needed', () => {
    const { container } = render(<Faq />);
    expect(
      screen.getByText(
        'What your company spends on AI, call by call: by provider, model, project, member and agent.',
      ),
    ).toBeInTheDocument();
    expect(container.textContent).toContain('One key covers 40+ models');
    expect(screen.getByText('When do I need Pro?')).toBeInTheDocument();
  });
});
