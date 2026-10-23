import { render, screen } from '@testing-library/react';
import QuestionList from '../../../src/components/Question/QuestionList.jsx';

const mockQuestions = [
  {
    _id: 'question-1',
    title: 'How do I center a div?',
    description: 'Use Flexbox to align the div in both directions.',
    tags: [{ name: 'CSS' }],
    voteCount: 12,
    author: { _id: 'user-1', name: 'styleHelper' },
    createdAt: '2025-02-01T12:00:00Z',
    answers: [],
  },
  {
    _id: 'question-2',
    title: 'When should I use const?',
    description: 'Use const when the variable will not be reassigned.',
    tags: [{ name: 'JavaScript' }],
    voteCount: 5,
    author: { _id: 'user-2', name: 'codeGuide' },
    createdAt: '2025-02-02T12:00:00Z',
    answers: [],
  },
];

describe('QuestionList', () => {
  it('renders the supplied question titles', () => {
    render(<QuestionList questions={mockQuestions} />);

    expect(screen.getByText('How do I center a div?')).toBeInTheDocument();
    expect(screen.getByText('When should I use const?')).toBeInTheDocument();
  });

  it('renders the supplied question descriptions', () => {
    render(<QuestionList questions={mockQuestions} />);

    expect(
      screen.getByText('Use Flexbox to align the div in both directions.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Use const when the variable will not be reassigned.'),
    ).toBeInTheDocument();
  });

  it('renders each question vote count', () => {
    render(<QuestionList questions={mockQuestions} />);

    expect(screen.getByText('12', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('5', { exact: true })).toBeInTheDocument();
  });

  it('renders multiple questions with their individual details', () => {
    render(<QuestionList questions={mockQuestions} />);

    expect(screen.getByText('How do I center a div?')).toBeInTheDocument();
    expect(screen.getByText('styleHelper')).toBeInTheDocument();
    expect(screen.getByText('When should I use const?')).toBeInTheDocument();
    expect(screen.getByText('codeGuide')).toBeInTheDocument();
  });

  it('shows the loading state and then the empty state when there are no questions', () => {
    const { rerender } = render(<QuestionList questions={[]} loading />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading questions...');
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
    expect(screen.queryByText('No questions found')).not.toBeInTheDocument();

    rerender(<QuestionList questions={[]} loading={false} />);

    expect(screen.getByText('No questions found')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
