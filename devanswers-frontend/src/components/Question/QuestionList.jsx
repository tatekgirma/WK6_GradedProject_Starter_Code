import { Spinner } from 'react-bootstrap';
import QuestionCard from './QuestionCard.jsx';
import './QuestionList.css';

const QuestionList = ({ questions = [], loading = false }) => {
  if (loading) {
    return (
      <div className="qlist-loading" role="status">
        <Spinner animation="border" className="qlist-spinner" aria-hidden="true" />
        <p className="mt-3 mb-0">Loading questions...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="qlist-empty mb-0">No questions found</p>
      </div>
    );
  }

  return (
    <div className="qlist">
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
