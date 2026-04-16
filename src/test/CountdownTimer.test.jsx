import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import CountdownTimer from '../components/CountdownTimer';

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the timer display as 00:00 on load', () => {
    render(<CountdownTimer />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('renders Start, Pause, and Reset buttons', () => {
    render(<CountdownTimer />);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('does not start when minutes and seconds are both 0', () => {
    render(<CountdownTimer />);
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('starts counting down after clicking Start', () => {
    render(<CountdownTimer />);
    const [, secondsInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(secondsInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText('00:07')).toBeInTheDocument();
  });

  it('stops at 00:00 when time runs out', () => {
    render(<CountdownTimer />);
    const [, secondsInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(secondsInput, { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('pauses the timer when Pause is clicked', () => {
    render(<CountdownTimer />);
    const [, secondsInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(secondsInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText('00:08')).toBeInTheDocument();
  });

  it('resumes the timer after pausing', () => {
    render(<CountdownTimer />);
    const [, secondsInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(secondsInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText('00:06')).toBeInTheDocument();
  });

  it('resets the timer to 00:00 when Reset is clicked', () => {
    render(<CountdownTimer />);
    const [, secondsInput] = screen.getAllByRole('spinbutton');
    fireEvent.change(secondsInput, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });
});
