import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { getReward } from '../utils/rewards';
import GreetingCard from './GreetingCard';
import { questions } from '../data/questions';
import Crackers from '../animations/Crackers';

const ResultPage = ({ userName, score, resetApp, userAnswers }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);  // NEW: control feedback view

  const reward = getReward(score);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setDisplayScore(current);
      if (current >= score) {
        clearInterval(interval);
        setTimeout(() => setShowCard(true), 500);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [score]);

  // Firework effect
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const createFirework = () => {
      const fw = Array.from({ length: 12 }, (_, i) => ({
        id: Math.random(),
        angle: (i * 30) * (Math.PI / 180),
        left: 50 + Math.random() * 20 - 10,
        top: 30 + Math.random() * 20 - 10,
      }));
      setFireworks(prev => [...prev, ...fw]);
      setTimeout(() => {
        setFireworks(prev => prev.slice(12));
      }, 1000);
    };

    const interval = setInterval(createFirework, 2000);
    createFirework();

    return () => clearInterval(interval);
  }, []);

  // NEW: Render feedback for each question
  const renderFeedback = () => (
    <div className="mb-10 max-w-3xl mx-auto bg-white/10 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Answers</h2>
      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {questions.map((q, i) => {
          const userAnswer = userAnswers[i];
          const isCorrect = userAnswer === q.correct;
          return (
            <li
              key={i}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'
              }`}
            >
              <p className="font-semibold mb-1">{q.q}</p>
              <p>
                Your answer: <span className="italic">{q.options[userAnswer] || "No answer"}</span>{" "}
                {isCorrect ? (
                  <CheckCircle2 className="inline-block text-green-400 ml-2" size={18} />
                ) : (
                  <XCircle className="inline-block text-red-400 ml-2" size={18} />
                )}
              </p>
              {!isCorrect && (
                <p>
                  Correct answer: <strong>{q.options[q.correct]}</strong>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-600 to-pink-600 px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      <Crackers />

      {/* Fireworks */}
      <div className="fixed inset-0 pointer-events-none">
        {fireworks.map(fw => (
          <div
            key={fw.id}
            className="absolute animate-firework"
            style={{
              left: `${fw.left}%`,
              top: `${fw.top}%`,
              '--x': `${Math.cos(fw.angle) * 100}px`,
              '--y': `${Math.sin(fw.angle) * 100}px`,
            }}
          >
            <Sparkles className="text-yellow-300" size={14} />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10 px-4 sm:px-0">
        {/* Score Section */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-block mb-5">
            <Trophy className="text-yellow-300 animate-float" size={48} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex justify-center items-center gap-2">
            {reward.icon} <span>{reward.title}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 font-light mb-6 sm:mb-8 px-2">
            {reward.message}
          </p>

          <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl px-10 py-6 border-2 border-white/30 shadow-2xl animate-countUp">
            <div className="text-5xl sm:text-6xl font-bold text-white">
              {displayScore} / {questions.length}
            </div>
            <div className="text-white/80 text-base mt-1 sm:mt-2">Your Score</div>
          </div>
        </div>

        {/* Conditionally show GreetingCard or Feedback */}
        {showCard && !showFeedback && (
          <div className="animate-fadeIn px-2 sm:px-0">
            <GreetingCard userName={userName} reward={reward} score={score} />
          </div>
        )}

               {showCard && showFeedback && (
          <div className="animate-fadeIn px-2 sm:px-0">
            {renderFeedback()}

            {/* Back button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowFeedback(false)}
                className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 rounded-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/40 shadow-md inline-flex items-center gap-2 px-4 sm:px-6 text-sm sm:text-base"
              >
                <RotateCcw size={16} />
                Back to Greeting Card
              </button>
            </div>
          </div>
        )}

        {/* Button to toggle feedback */}
        {!showFeedback && showCard && (
          <div className="text-center mt-8 animate-fadeIn px-2 sm:px-0">
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 rounded-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/40 shadow-md inline-flex items-center gap-2 px-4 sm:px-6 text-sm sm:text-base"
            >
              <RotateCcw size={16} />
              Check Your Answers
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultPage;
