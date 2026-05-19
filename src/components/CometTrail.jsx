import { useEffect, useState } from 'react';

export function CometTrail() {
  const [glowPos, setGlowPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);

      if (x === undefined || y === undefined) return;

      setGlowPos({ x, y });

      const star = document.createElement('div');
      star.className = 'comet-dust';
      
      const size = Math.random() * 4 + 2; 
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      star.style.setProperty('--spread-x', `${Math.random() * 40 - 20}px`);
      star.style.setProperty('--spread-y', `${Math.random() * 40 - 20}px`);

      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 600);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div 
      className="lunar-glow" 
      style={{ left: glowPos.x, top: glowPos.y }}
    ></div>
  );
}