import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'project' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // 1. Detect if touch device or coarse pointer
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    // 2. Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        if (type === 'project') {
          setCursorState('project');
          setCursorText(text || 'VIEW');
          return;
        }
        if (type === 'pointer') {
          setCursorState('pointer');
          setCursorText('');
          return;
        }
      }

      // Check standard interactive elements
      if (target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]')) {
        setCursorState('pointer');
        setCursorText('');
      } else if (target.closest('input, textarea')) {
        setCursorState('text');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    // Smooth trailing animation loop with lerp
    const render = () => {
      const ease = 0.16;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300" aria-hidden="true" role="presentation">
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        role="presentation"
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full transition-all duration-150 ease-out ${
          cursorState === 'text'
            ? 'opacity-0'
            : cursorState === 'project'
            ? 'h-3 w-3 -ml-1.5 -mt-1.5 bg-lime'
            : 'bg-coral shadow-[0_0_8px_#FF7058]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Outer Ring / Morphing Pill */}
      <div
        ref={ringRef}
        aria-hidden="true"
        role="presentation"
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorState === 'project'
            ? 'h-20 w-20 -ml-10 -mt-10 bg-violet/90 backdrop-blur-md border border-lime text-lime shadow-[0_0_30px_rgba(121,87,255,0.6)] scale-100'
            : cursorState === 'pointer'
            ? 'h-12 w-12 -ml-6 -mt-6 border-2 border-violet bg-violet/20 backdrop-blur-xs scale-125 shadow-[0_0_20px_rgba(121,87,255,0.4)]'
            : cursorState === 'text'
            ? 'h-8 w-1 -ml-0.5 -mt-4 rounded-xs bg-coral opacity-80'
            : 'h-8 w-8 -ml-4 -mt-4 border border-violet/60 bg-transparent opacity-75'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorState === 'project' && (
          <span
            ref={labelRef}
            className="font-mono text-[11px] font-bold tracking-widest text-lime uppercase animate-pulse"
          >
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>
    </div>
  );
};

