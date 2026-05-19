import { useEffect, useState } from 'react';

export function TouroConstellation() {
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
          d="M 40 40 L 90 90 M 150 50 L 110 100 M 90 90 L 110 100 L 100 130 L 75 120 L 90 90 M 75 120 L 40 140"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="40" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="150" cy="50" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="90" cy="90" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="110" cy="100" r="4.5" fill="#ffffff" className="draw-star-live" style={{ fill: '#ffaa66' }} />
        <circle cx="100" cy="130" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="75" cy="120" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="40" cy="140" r="3" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}