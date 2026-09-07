import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface CyberBackgroundProps {
  theme: ThemeMode;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle cyber constellation
    const particleCount = Math.min(width > 768 ? 45 : 20, 60);
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const nodeColor = isDark ? 'rgba(0, 243, 255, ' : 'rgba(0, 102, 204, ';
      const altNodeColor = isDark ? 'rgba(217, 70, 239, ' : 'rgba(147, 51, 234, ';

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = i % 2 === 0 ? `${nodeColor}${p.alpha})` : `${altNodeColor}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * (isDark ? 0.15 : 0.08);
            ctx.strokeStyle = `${nodeColor}${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          theme === 'dark' ? 'cyber-grid-dark opacity-60' : 'cyber-grid-light opacity-40'
        }`} 
      />

      {/* Ambient Neon Blobs */}
      <div 
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${
          theme === 'dark' 
            ? 'bg-cyan-500/10' 
            : 'bg-cyan-400/10'
        }`} 
      />
      <div 
        className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${
          theme === 'dark' 
            ? 'bg-purple-600/10' 
            : 'bg-purple-400/10'
        }`} 
      />
      <div 
        className={`absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${
          theme === 'dark' 
            ? 'bg-emerald-500/10' 
            : 'bg-emerald-400/10'
        }`} 
      />

      {/* Cyber Canvas Lines */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scanline pattern for authentic cyber display */}
      {theme === 'dark' && (
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      )}
    </div>
  );
};
