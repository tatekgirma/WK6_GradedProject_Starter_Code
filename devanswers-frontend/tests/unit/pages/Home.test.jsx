import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { questions } from '../../../data/questions.js';
import Home from '../../../src/pages/Question/Home.jsx';

describe('Home', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders an accessible Ask Question button', () => {
    render(<Home />);

    expect(
      screen.getByRole('button', { name: 'Ask Question' }),
    ).toBeInTheDocument();
  });

  it('shows the loading spinner message while questions are loading', () => {
    vi.useFakeTimers();
    render(<Home />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading questions...');
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
  });

  it('displays the loaded question count using the page wording', () => {
    vi.useFakeTimers();
    render(<Home />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(
      screen.getByText(`${questions.length} questions`),
    ).toBeInTheDocument();
  });

  it('displays question titles, descriptions, and vote counts after loading', () => {
    vi.useFakeTimers();
    render(<Home />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText(questions[0].title)).toBeInTheDocument();
    expect(screen.getByText(questions[0].description)).toBeInTheDocument();
    expect(
      screen.getByText(String(questions[0].voteCount), { exact: true }),
    ).toBeInTheDocument();
  });

  it('renders the loaded seed questions through the question list', () => {
    vi.useFakeTimers();
    render(<Home />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    questions.forEach((question) => {
      expect(screen.getByText(question.title)).toBeInTheDocument();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
