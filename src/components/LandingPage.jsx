import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Crackers from '../animations/Crackers';

const LandingPage = ({ setPage, setUserName }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name.trim());
      setPage('quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-900 to-pink-900 relative overflow-hidden px-4 sm:px-6 py-8 sm:py-12">
      <Crackers />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full text-center animate-fadeIn">
          
          {/* Greeting from Club */}
          <div className="mb-6 sm:mb-8">
            <p className="text-orange-300 text-base sm:text-lg mb-2 font-light tracking-wide">
              ✨ Presented by ✨
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold mb-2 animate-gradient bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              Utsaha Cultural Club
            </h3>
            <p className="text-orange-200 text-sm sm:text-base italic">
              Celebrating the Festival of Lights with Knowledge & Joy
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <Sparkles className="inline-block text-yellow-300 animate-sparkle" size={36} />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight animate-gradient bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-300 bg-clip-text text-transparent bg-[length:200%_auto]">
            Diwali Celebration Hub
          </h1>
          
          <p className="text-lg sm:text-xl text-orange-200 mb-8 sm:mb-10 font-light">
            Light Up Your Knowledge & Celebrate the Festival of Lights
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-white/20 shadow-xl max-w-md mx-auto hover:bg-white/15 transition-all duration-300">
            <label className="block text-white text-base sm:text-lg mb-3 text-left font-medium">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
  const value = e.target.value;
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  setName(capitalized);
}}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              placeholder="Your name here..."
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-orange-200/60 border border-white/30 focus:border-orange-300 focus:outline-none transition-all text-sm sm:text-base"
            />
            
            <button
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full mt-5 sm:mt-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Start Celebration
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-8 sm:mt-10 flex gap-6 sm:gap-8 justify-center text-orange-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              <span>7 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
              <span>Personalized Card</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>Positive Rewards</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
