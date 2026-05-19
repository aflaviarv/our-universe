import { useEffect, useState } from 'react';

export function SagitarioConstellation() {
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
          d="M 90 90 L 125 80 L 135 115 L 95 130 L 90 90 M 90 90 L 110 55 L 125 80 M 90 90 L 60 110 L 95 130 M 125 80 L 155 85 L 135 115"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="90" cy="90" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="125" cy="80" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="135" cy="115" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="95" cy="130" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="110" cy="55" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="60" cy="110" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="155" cy="85" r="2.5" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}