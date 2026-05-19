import { useEffect, useState } from 'react';

export function CapricornioConstellation() {
  const [constellation, setConstellation] = useState(null);

  useEffect(() => {
    const generateNewConstellation = () => {
      setConstellation({
        key: Date.now(), 
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
        scale: Math.random() * 0.4 + 0.4,
        rotation: Math.random() * 360,
      });
    };

    generateNewConstellation();
    const interval = setInterval(() => { generateNewConstellation(); }, 6000); 
    return () => clearInterval(interval);
  }, []);

  if (!constellation) return null;

  return (
    <div className="constellation-layer">
      <svg
        key={constellation.key} 
        className="cancer-svg-live"
        style={{
          top: constellation.top,
          left: constellation.left,
          transform: `scale(${constellation.scale}) rotate(${constellation.rotation}deg)`,
        }}
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <path
          className="constellation-path-live"
          d="M 50 60 L 85 70 L 125 80 L 150 85 M 50 60 L 70 110 L 100 140 L 135 120 L 150 85"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="60" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="85" cy="70" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="125" cy="80" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="150" cy="85" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="70" cy="110" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="100" cy="140" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="135" cy="120" r="3.5" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}