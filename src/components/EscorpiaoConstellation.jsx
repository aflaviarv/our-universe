import { useEffect, useState } from 'react';

export function EscorpiaoConstellation() {
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
          d="M 130 40 L 115 60 M 100 35 L 115 60 M 105 65 L 115 60 L 95 90 L 85 120 L 92 150 L 115 160 L 132 145 L 124 125"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="130" cy="40" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="100" cy="35" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="105" cy="65" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="115" cy="60" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="95" cy="90" r="5" fill="#ffffff" className="draw-star-live" style={{ fill: '#ff8855' }} />
        <circle cx="85" cy="120" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="92" cy="150" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="115" cy="160" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="132" cy="145" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="124" cy="125" r="3" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}