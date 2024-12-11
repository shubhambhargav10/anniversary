import React, { useState } from 'react';
import './App.css';

const questions = [
  { 
    id: 1, 
    question: 'What is my favorite color?', 
    answers: ['blue', 'black', 'white', 'saffron', 'kesari', 'yellow', 'orange'] 
  },
  { 
    id: 2, 
    question: 'What is my favorite food?', 
    answers: [
      'daal chawal', 
      'daal chawal aloo bhujia', 
      'daal chawal aloo ki bhujia', 
      'daal chawal aaloo bhujia', 
      'daal chawal aaloo ki bhujia'
    ] 
  },
  { 
    id: 3, 
    question: 'Where did we meet for the first time?', 
    answers: [
      'vapi', 'mcd vapi', "Mac'd Vapi", "Mac'd", 'Macd', 'mcd', 'Mcd', 'Mcd vapi', 'Mcd Vapi','at my home','hp','haria park'
    ] 
  },
  { 
    id: 4, 
    question: 'When is our anniversary?', 
    answers: [
      '11 december 2020', '11th dec 2020', '11 dec', '11th dec', 
      '11th dec 2020', '11th december 2020', '11/12/2020'
    ] 
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const handleAnswerChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = (userAnswers[currentQuestionIndex] || '').trim().toLowerCase();

    const isCorrectAnswer = currentQuestion.answers
      .map(answer => answer.toLowerCase().trim())
      .includes(userAnswer);

    if (isCorrectAnswer) {
      setCorrectAnswerCount((prev) => prev + 1);

      // Dynamic success message based on correctAnswerCount
      const successMessages = [
        'Ohh, you know me!',
        'You know me so well!',
        'We really are soulmates!',
        'Perfect match, aren’t we?',
      ];
      const successMessage =
        correctAnswerCount < successMessages.length
          ? successMessages[correctAnswerCount]
          : successMessages[successMessages.length - 1];

      setPopupMessage(successMessage);
      setPopupType('success');

      // Check if it's the last correct answer and show hearts
      if (correctAnswerCount === questions.length - 1) {
        setShowHearts(true);  // Show hearts only after the last right answer
      }

      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
        }
        setPopupMessage('');
      }, 2000);
    } else {
      setPopupMessage('Incorrect! Try again.');
      setPopupType('error');
      setTimeout(() => {
        setPopupMessage('');
      }, 2000);
    }
  };

  const handleLoveButtonClick = () => {
    setShowHearts(true);  // Show hearts when the "I love you too" button is clicked
  };

  return (
    <div className="app-container">
      {showHearts && (
        <div className="hearts-container">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="heart"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {popupMessage && (
        <div className={`popup ${popupType}`}>
          {popupMessage}
        </div>
      )}
      {!isCompleted ? (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <input
            type="text"
            onChange={handleAnswerChange}
            value={userAnswers[currentQuestionIndex] || ''}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <div className="completion-container">
          <h1>Happy Anniversary, My Love!</h1>
          <p>
          My Dearest Urvashi, <br />
          Every moment with you feels so right, <br />
          You've filled my days with love so bright. <br />
          With every smile and every glance, <br />
          My heart skips a beat, caught in your trance. <br />
          You're my partner, my soulmate, my queen, <br />
          The most beautiful love I've ever seen. <br />
          Together, we've created memories so sweet, <br />
          With you by my side, life feels complete. <br />
          In your eyes, I see my forever home, <br />
          With you, Urvashi, I never feel alone. <br />
          Here's to the love we share, so true, <br />
          My world is brighter because of you. <br />
          I love you more than words can convey, <br />
          Forever and always, in every way. 💖
          </p>
          <button
            className="love-button"
            onClick={handleLoveButtonClick}
          >
            I love you too...!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
