import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { questions as questionData } from '../../../data/questions.js';
import QuestionList from '../../components/Question/QuestionList.jsx';
import "./Home.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuestions(questionData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Container fluid className="home-container py-4">
      <Row className="justify-content-center">
        <Col className="home-col">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="home-title mb-1">All Questions</h1>
              <p className="home-subtitle mb-0">{questions.length} questions</p>
            </div>
            <Button
              type="button"
              className="home-ask-btn"
              onClick={() => window.alert('Ask Question clicked')}
            >
              Ask Question
            </Button>
          </div>
          <QuestionList questions={questions} loading={loading} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
