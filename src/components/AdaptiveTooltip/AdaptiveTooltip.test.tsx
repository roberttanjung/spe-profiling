import { act, fireEvent, render, screen } from '@testing-library/react';
import AdaptiveTooltip from './AdaptiveTooltip';

describe('AdaptiveTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('can be shown repeatedly after multiple hovers', () => {
    render(
      <AdaptiveTooltip
        trigger={<button type="button">Hover me</button>}
        content="Tooltip content"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });

    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    fireEvent.mouseLeave(trigger);
    act(() => {
      vi.advanceTimersByTime(230);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    fireEvent.mouseLeave(trigger);
    act(() => {
      vi.advanceTimersByTime(230);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
  });

  it('stays open when moving from trigger into tooltip and closes after leaving both', () => {
    render(
      <AdaptiveTooltip
        trigger={<button type="button">Hover me</button>}
        content="Tooltip content"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });

    fireEvent.mouseEnter(trigger);
    const tooltip = screen.getByRole('tooltip');

    fireEvent.mouseLeave(trigger, { relatedTarget: tooltip });
    fireEvent.mouseEnter(tooltip);

    act(() => {
      vi.advanceTimersByTime(230);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    fireEvent.mouseLeave(tooltip);
    act(() => {
      vi.advanceTimersByTime(230);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
