import { useEffect, useState } from 'react';

export function PeixesConstellation() {
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
          d="M 45 50 L 70 75 L 90 100 L 105 140 M 105 140 L 135 125 L 145 90 L 130 65 L 115 80 L 135 95 L 145 90"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="45" cy="50" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="70" cy="75" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="90" cy="100" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="105" cy="140" r="4" fill="#ffffff" className="draw-star-live" />
        <circle cx="135" cy="125" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="145" cy="90" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="130" cy="65" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="115" cy="80" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="135" cy="95" r="2.5" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}