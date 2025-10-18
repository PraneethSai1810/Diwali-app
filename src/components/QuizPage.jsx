import React, { useState } from 'react';
import { Circle, CheckCircle2, ArrowRight } from 'lucide-react';
import { questions } from '../data/questions';
import Crackers from '../animations/Crackers';

const QuizPage = ({ setPage, answers, setAnswers, setScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => setSelected(index);

  const handleNext = () => {
    if (selected === null) return;

    const newAnswers = [...answers, selected === questions[currentQuestion].correct];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      const finalScore = newAnswers.filter(a => a).length;
      setScore(finalScore);
      setPage('result');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 sm:px-6 py-8 sm:py-12">
      <Crackers />
      <div className="max-w-2xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-white/80 text-xs sm:text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 shadow-xl animate-slideIn">
          
          {/* Question */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl text-white font-semibold leading-relaxed">
              {questions[currentQuestion].q}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-300 ${
                  selected === index
                    ? 'bg-white/30 border-2 border-orange-400 shadow-lg scale-[1.01]'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {selected === index ? (
                    <CheckCircle2 className="text-orange-400 flex-shrink-0" size={20} />
                  ) : (
                    <Circle className="text-white/60 flex-shrink-0" size={20} />
                  )}
                  <span className="text-white text-sm sm:text-base">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-medium sm:font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
