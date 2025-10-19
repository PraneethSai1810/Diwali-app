import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import './animations/animations.css';

const App = () => {
  const [page, setPage] = useState('landing');
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const resetApp = () => {
    setPage('landing');
    setUserName('');
    setScore(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen">
      {page === 'landing' && (
        <LandingPage 
          setPage={setPage} 
          setUserName={setUserName}
        />
      )}
      {page === 'quiz' && (
        <QuizPage 
          setPage={setPage}
          answers={answers}
          setAnswers={setAnswers}
          setScore={setScore}
        />
      )}
      {page === 'result' && (
        <ResultPage 
          userName={userName}
          score={score}
          resetApp={resetApp}
          userAnswers={answers} // ✅ added this line
        />
      )}
    </div>
  );
};

export default App;
