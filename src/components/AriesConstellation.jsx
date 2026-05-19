import { useEffect, useState } from 'react';

export function AriesConstellation() {
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
          d="M 50 70 L 90 75 L 135 100 L 145 120"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="70" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="90" cy="75" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="135" cy="100" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="145" cy="120" r="3" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}