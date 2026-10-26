import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { questions as questionData } from "../../../data/questions.js";
import AnswerForm from "../../components/Answer/AnswerForm.jsx";
import AnswerList from "../../components/Answer/AnswerList.jsx";
import QuestionContent from "../../components/Question/QuestionContent.jsx";
import "./QuestionDetail.css";

const QuestionDetail = ({ id }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const matchingQuestion = questionData.find(item => item._id === id);
      setQuestion(matchingQuestion ?? null);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [id]);

  if (loading) {
    return (
      <Container fluid className='py-4'>
        <div
          className='d-flex flex-column align-items-center justify-content-center py-5'
          role='status'>
          <Spinner animation='border' variant='primary' aria-hidden='true' />
          <p className='mt-3 mb-0'>Loading question...</p>
        </div>
      </Container>
    );
  }

  if (!question) {
    return (
      <Container fluid className='py-4'>
        <p className='text-center py-5'>Question not found.</p>
      </Container>
    );
  }

  return (
    <Container fluid className='py-4'>
      <QuestionContent question={question} />
      <AnswerList answers={question.answers ?? []} />
      <AnswerForm />
    </Container>
  );
};

export default QuestionDetail;
