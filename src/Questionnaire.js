import React, { useState } from 'react';

const questions = [
  { id: 1, question: 'What is my favorite color?', answer: 'blue' },
  { id: 2, question: 'What is my favorite food?', answer: 'daal chawal' },
  { id: 3, question: 'Where did we meet for the first time?', answer: 'mcd' },
  { id: 4, question: 'When is our anniversary?', answer: '11 december' },
];

const Questionnaire = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: e.target.value.trim().toLowerCase(),
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex] || '';

    if (userAnswer === currentQuestion.answer) {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        onComplete(); 
      }
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="question-container">
      <h2>{questions[currentQuestionIndex].question}</h2>
      <input
        type="text"
        onChange={handleAnswerChange}
        value={userAnswers[currentQuestionIndex] || ''}
      />
      {isCorrect === false && <p className="error">You dont know this about me!</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Questionnaire;
