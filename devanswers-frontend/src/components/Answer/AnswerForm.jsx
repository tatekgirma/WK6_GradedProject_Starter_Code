import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './AnswerForm.css';

const AnswerForm = () => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!answer.trim()) {
      alert('Answer cannot be empty!');
      return;
    }

    alert('Answer submitted!');
    setAnswer('');
  };

  return (
    <section className="answer-form-card" aria-labelledby="answer-form-title">
      <h2 id="answer-form-title" className="answer-form-title">
        Your Answer
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="answer-form-label" htmlFor="answer-text">
          Your answer
        </label>
        <textarea
          id="answer-text"
          className="form-control answer-textarea"
          rows={8}
          placeholder="Write your answer here..."
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button className="btn btn-primary answer-submit-button" type="submit">
          <FaPaperPlane className="me-2" aria-hidden="true" />
          Post Answer
        </button>
      </form>
    </section>
  );
};

export default AnswerForm;