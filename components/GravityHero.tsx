import React, { useRef, useEffect } from 'react';

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'circle' | 'square' | 'pill';
  angle: number;
  vAngle: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const GravityHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let shapes: Shape[] = [];
    let burstParticles: BurstParticle[] = [];
    let animationFrameId: number;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createShape = (): Shape => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.2 + 0.1),
      radius: Math.random() * 6 + 4, // Smaller particles (4-10px)
      type: Math.random() > 0.6 ? 'circle' : Math.random() > 0.5 ? 'square' : 'pill',
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
    });

    const createShapes = () => {
      shapes = [];
      for (let i = 0; i < 50; i++) {
        shapes.push(createShape());
      }
    };

    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = Math.random() * 2 + 1;
        burstParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30,
          maxLife: 30,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const checkClusters = () => {
      // We need to verify if we have a cluster containing all 3 types: circle, square, pill
      for (let i = 0; i < shapes.length; i++) {
        const nearby: number[] = [i];

        // Find neighbors
        for (let j = 0; j < shapes.length; j++) {
          if (i === j) continue;
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          // Slightly increased threshold to make grouping easier
          if (Math.sqrt(dx * dx + dy * dy) < 60) {
            nearby.push(j);
          }
        }

        if (nearby.length >= 3) {
          // Check if we have one of each type
          const clusterShapes = nearby.map(idx => ({ idx, type: shapes[idx].type }));

          const circle = clusterShapes.find(s => s.type === 'circle');
          const square = clusterShapes.find(s => s.type === 'square');
          const pill = clusterShapes.find(s => s.type === 'pill');

          // Only burst if we have at least one of each distinct type
          if (circle && square && pill) {
            // Get indices of the 3 distinct shapes to remove
            const indicesToRemove = [circle.idx, square.idx, pill.idx];

            // Calculate center
            const cx = (shapes[circle.idx].x + shapes[square.idx].x + shapes[pill.idx].x) / 3;
            const cy = (shapes[circle.idx].y + shapes[square.idx].y + shapes[pill.idx].y) / 3;

            createBurst(cx, cy);

            // Remove selected shapes (sort descending to safely splice)
            indicesToRemove.sort((a, b) => b - a);
            // Use a Set to ensure we don't try to remove the same index twice if (unlikely) overlap
            const uniqueIndices = [...new Set(indicesToRemove)];

            uniqueIndices.forEach(idx => {
              if (idx < shapes.length) shapes.splice(idx, 1);
            });

            // Add replacements to keep the game going
            shapes.push(createShape());
            shapes.push(createShape());
            shapes.push(createShape());

            break; // Limit to one burst per frame
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      // Update burst particles
      burstParticles = burstParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) return false;

        ctx.fillStyle = isDark ? '#fff' : '#3b82f6';
        ctx.globalAlpha = (p.life / p.maxLife) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); // Smaller burst particles
        ctx.fill();

        return true;
      });

      // Update shapes
      shapes.forEach(shape => {
        const dx = mouseRef.current.x - shape.x;
        const dy = mouseRef.current.y - shape.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.2;
          shape.vx += (dx / dist) * force;
          shape.vy += (dy / dist) * force;
        }

        shape.vx *= 0.96;
        shape.vy *= 0.96;
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.angle += shape.vAngle;

        if (shape.y < -50) {
          shape.y = height + 50;
          shape.x = Math.random() * width;
        }
        if (shape.x < -50) shape.x = width + 50;
        if (shape.x > width + 50) shape.x = -50;

        ctx.fillStyle = isDark ? '#fff' : '#18181b';
        ctx.globalAlpha = 0.15; // Subtler opacity
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);

        if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape.type === 'square') {
          ctx.beginPath();
          ctx.roundRect(-shape.radius, -shape.radius, shape.radius * 2, shape.radius * 2, 4);
          ctx.fill();
        } else {
          ctx.beginPath();
          const w = shape.radius * 2.5;
          const h = shape.radius * 0.8;
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
          ctx.fill();
        }

        ctx.restore();
      });

      checkClusters();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    createShapes();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-0 w-screen h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto" />
    </div>
  );
};

export default GravityHero;
