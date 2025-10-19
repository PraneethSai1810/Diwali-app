import React, { useEffect } from "react";
import { Download, Sparkles, Star } from "lucide-react";
import html2canvas from "html2canvas";
import '../fonts/fonts.css';

const GreetingCard = ({ userName, reward }) => {
  useEffect(() => {
    const canvas = document.getElementById("fireworks-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = 400);

    class Firework {
      constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.particles = [];
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const speed = Math.random() * 3 + 2;
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
      update() {
        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.02;
          p.alpha -= 0.015;
        });
        this.particles = this.particles.filter((p) => p.alpha > 0);
      }
      draw(ctx) {
        this.particles.forEach((p) => {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      fireworks.forEach((fw) => fw.update());
      fireworks.forEach((fw) => fw.draw(ctx));
      fireworks = fireworks.filter((fw) => fw.particles.length > 0);
      requestAnimationFrame(animate);
    };
    animate();

    const colors = ["#FFD700", "#FF4500", "#FF69B4", "#ADFF2F", "#00BFFF"];
    const interval = setInterval(() => {
      fireworks.push(new Firework(Math.random() * w, Math.random() * (h - 80), colors));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const downloadCard = async () => {
    const card = document.getElementById("greeting-card");
    const fireworks = document.getElementById("fireworks-canvas");
    if (fireworks) fireworks.style.display = "none";

    await new Promise((res) => setTimeout(res, 300));

    html2canvas(card, {
      backgroundColor: "#000",
      scale: 3,
      useCORS: true,
      logging: false,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = `Diwali-${userName}-Card.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .finally(() => {
        if (fireworks) fireworks.style.display = "block";
      });
  };

  return (
    <div className="space-y-5 max-w-md mx-auto">
      <div
        id="greeting-card"
        className={`bg-gradient-to-br ${reward.gradient} rounded-2xl shadow-xl overflow-hidden relative`}
        style={{ minHeight: "400px" }}
      >
        <canvas
          id="fireworks-canvas"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 5 }}
        ></canvas>

        <div className="absolute inset-0 opacity-10 z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <Star
              key={i}
              className="absolute text-white"
              size={16}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[400px]">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Sparkles className="text-white animate-pulse" size={32} />
            </div>
            <h2
  style={{ fontFamily: "'Stark Walker', 'Maldives', serif", letterSpacing: '3px', fontSize:"2rem", color:"white"}}
>
  Happy Diwali
</h2>
            <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
          </div>

          <div className="text-center my-10">
  <p className="text-lg text-white/90 mb-2 font-semibold" style={{ fontFamily: "'Lato', sans-serif" }}>
    Dear
  </p>
 <h3
  className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg tracking-wide"
  style={{ fontFamily: "'Maldives', 'Ghost Festival 2', serif", letterSpacing: '2px' }}
>
  {userName}
</h3>
</div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/50 text-center mb-8">
  <p
    style={{ fontFamily: "'Counte DEMO', 'Clawmark', serif", fontSize:"1.5rem", color:"white" }}
  >
    "{reward.quote}"
  </p>
</div>

          <div className="text-center mb-8">
  <p
    className="text-white/90 text-lg sm:text-xl leading-relaxed"
    style={{ fontFamily: "'Open Sans', sans-serif" }}
  >
    May this festival bring joy, prosperity, and endless light to your life
  </p>
</div>

          <div className="text-center mt-6">
  <div
    className="text-white text-2xl font-bold drop-shadow-lg tracking-widest"
    style={{ fontFamily: "'Beautiful Santa', sans-serif", letterSpacing: '2px',fontSize:"1.5rem" }}
  >
    ✨ Utsaha Cultural Club ✨
  </div>
</div>
        </div>
      </div>

      <button
        onClick={downloadCard}
        className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-2 rounded-lg hover:bg-white/30 transform hover:scale-102 transition-all duration-300 border border-white/40 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <Download size={18} />
        Download Your Card
      </button>
    </div>
  );
};

export default GreetingCard;