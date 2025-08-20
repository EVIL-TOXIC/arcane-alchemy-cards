import { useEffect, useState } from 'react';
import witchSilhouette from '@/assets/witch-silhouette.png';

const MysticalBackground = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-900/20 to-background" />
      
      {/* Floating witch silhouette */}
      <div className="absolute top-10 right-10 opacity-30 floating-sparkles">
        <img 
          src={witchSilhouette} 
          alt="Mystical Witch" 
          className="w-32 h-32 filter brightness-75"
        />
      </div>

      {/* Animated sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-accent rounded-full animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Mystical glow orbs */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-accent/30 rounded-full blur-lg animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/15 rounded-full blur-md animate-pulse-glow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export { MysticalBackground };