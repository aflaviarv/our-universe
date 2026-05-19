import { useMemo } from 'react';

export function BackgroundStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, // Tamanho de 1px a 3px
      animationDuration: `${Math.random() * 3 + 2}s`, // Duração do piscar de 2s a 5s
    }));
  }, []);

  return (
    <div className="background-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="bg-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration
          }}
        ></div>
      ))}
    </div>
  );
}