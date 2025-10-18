import React, { useEffect, useState } from 'react';

const Crackers = () => {
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    const createExplosion = () => {
      const colors = [
        ['#FF6B35', '#FFD23F', '#FF8C42'], // Orange-Yellow
        ['#E91E63', '#F50057', '#FF4081'], // Pink-Red
        ['#9C27B0', '#BA68C8', '#E1BEE7'], // Purple
        ['#00BCD4', '#00E5FF', '#84FFFF'], // Cyan
        ['#4CAF50', '#8BC34A', '#CDDC39'], // Green
      ];

      const colorSet = colors[Math.floor(Math.random() * colors.length)];
      
      const newExplosion = {
        id: Date.now() + Math.random(),
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        colors: colorSet,
        particles: Array.from({ length: 150 }, (_, i) => ({
          id: i,
          angle: (Math.random() * 360) * (Math.PI / 180),
          velocity: 0.8 + Math.random() * 0.6,
          size: 3 + Math.random() * 5,
          trail: Math.random() > 0.5,
        }))
      };

      setExplosions(prev => [...prev, newExplosion]);

      setTimeout(() => {
        setExplosions(prev => prev.filter(e => e.id !== newExplosion.id));
      }, 2500);
    };

    createExplosion();
    const interval = setInterval(createExplosion, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {explosions.map(explosion => (
        <div key={explosion.id}>
          {/* Flash at center */}
          <div
            className="absolute"
            style={{
              left: `${explosion.x}%`,
              top: `${explosion.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-white animate-flash shadow-lg shadow-white/50"></div>
          </div>

          {/* Particles */}
          {explosion.particles.map(particle => {
            const distance = 100 * particle.velocity;
            const tx = Math.cos(particle.angle) * distance;
            const ty = Math.sin(particle.angle) * distance;
            const color = explosion.colors[particle.id % explosion.colors.length];

            return (
              <div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${explosion.x}%`,
                  top: `${explosion.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="animate-explode"
                  style={{
                    '--tx': `${tx}px`,
                    '--ty': `${ty}px`,
                    '--duration': `${1.2 + Math.random() * 0.6}s`,
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 ${particle.size * 2}px ${color}, 0 0 ${particle.size * 4}px ${color}`,
                    }}
                  ></div>
                  {particle.trail && (
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-trail"
                      style={{
                        width: '2px',
                        height: `${particle.size * 3}px`,
                        background: `linear-gradient(to bottom, ${color}, transparent)`,
                        opacity: 0.6,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}


        </div>
      ))}

      <style jsx>{`
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.2);
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(3);
            opacity: 0.8;
          }
          100% {
            transform: scale(5);
            opacity: 0;
          }
        }

        @keyframes ring {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
          }
        }

        @keyframes trail {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-explode {
          animation: explode var(--duration, 1.5s) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-flash {
          animation: flash 0.4s ease-out forwards;
        }

        .animate-ring {
          animation: ring 1.5s ease-out forwards;
        }

        .animate-trail {
          animation: trail 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Crackers;