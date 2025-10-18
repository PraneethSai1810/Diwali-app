import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

const FloatingDiyas = ({ count = 12 }) => {
  const [diyas, setDiyas] = useState([]);

  useEffect(() => {
    const diyaArray = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 16 + Math.random() * 12
    }));
    setDiyas(diyaArray);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {diyas.map(diya => (
        <div
          key={diya.id}
          className="absolute animate-float opacity-30"
          style={{
            left: `${diya.left}%`,
            bottom: '-50px',
            animationDelay: `${diya.delay}s`,
            animationDuration: `${diya.duration}s`,
          }}
        >
          <Flame 
            className="text-orange-400" 
            size={diya.size}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.6))'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingDiyas;