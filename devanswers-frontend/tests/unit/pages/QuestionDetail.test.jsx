import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { questions } from '../../../data/questions.js';
import QuestionDetail from '../../../src/pages/Question/QuestionDetail.jsx';

describe('QuestionDetail', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the selected question content', () => {
    vi.useFakeTimers();
    const question = questions[0];
    render(<QuestionDetail id={question._id} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole('heading', { name: question.title })).toBeInTheDocument();
    expect(screen.getByText(question.description)).toBeInTheDocument();
    expect(screen.getByText(question.author.name)).toBeInTheDocument();
  });

  it('renders the selected question answers and their supported metadata', () => {
    vi.useFakeTimers();
    const question = questions[0];
    render(<QuestionDetail id={question._id} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    question.answers.forEach((answer) => {
      expect(screen.getByText(answer.answerText)).toBeInTheDocument();
      expect(
        screen.getByText(`Answered by ${answer.author.name}`),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole('heading', { name: `Answers (${question.answers.length})` }),
    ).toBeInTheDocument();
  });

  it('renders the answer form with accessible input and submit controls', () => {
    vi.useFakeTimers();
    render(<QuestionDetail id={questions[0]._id} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByLabelText('Your answer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Post Answer' })).toBeInTheDocument();
  });

  it('shows the loading message while question details are loading', () => {
    vi.useFakeTimers();
    render(<QuestionDetail id={questions[0]._id} />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading question...');
    expect(screen.getByText('Loading question...')).toBeInTheDocument();
  });

  it('shows the not-found state for an unknown question id', () => {
    vi.useFakeTimers();
    render(<QuestionDetail id="missing-question" />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText('Question not found.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: questions[0].title })).not.toBeInTheDocument();
  });
});
