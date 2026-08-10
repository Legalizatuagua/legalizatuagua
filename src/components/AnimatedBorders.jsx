import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedBorders() {
  const containerRef = useRef(null);
  
  const leftPath1 = useRef(null);
  const leftPath2 = useRef(null);
  const leftPath3 = useRef(null);
  const leftPath4 = useRef(null);
  
  const rightPath1 = useRef(null);
  const rightPath2 = useRef(null);
  const rightPath3 = useRef(null);
  const rightPath4 = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let animationFrameId;
    let time = 0;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let containerOpacity = 1;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Helper to generate fluid organic wave paths
    const generateWavePath = (xBase, amp, freq, tPhase, sPhase, isRight = false) => {
      const getX = (y) => {
        const wave1 = amp * Math.sin(y * freq + tPhase + sPhase);
        const wave2 = (amp * 0.35) * Math.cos(y * freq * 1.7 + tPhase * 0.7 - sPhase * 0.4);
        const rawX = xBase + wave1 + wave2;
        return isRight ? 300 - rawX : rawX;
      };

      const p0 = getX(0);
      const p1 = getX(200);
      const p2 = getX(400);
      const p3 = getX(600);
      const p4 = getX(800);
      const p5 = getX(1000);

      return `M ${p0.toFixed(1)},0 C ${p0.toFixed(1)},100 ${p1.toFixed(1)},100 ${p1.toFixed(1)},200 C ${p1.toFixed(1)},300 ${p2.toFixed(1)},300 ${p2.toFixed(1)},400 C ${p2.toFixed(1)},500 ${p3.toFixed(1)},500 ${p3.toFixed(1)},600 C ${p3.toFixed(1)},700 ${p4.toFixed(1)},700 ${p4.toFixed(1)},800 C ${p4.toFixed(1)},900 ${p5.toFixed(1)},900 ${p5.toFixed(1)},1000`;
    };

    const tick = () => {
      // Smooth dampening for organic scroll response
      currentScroll += (targetScroll - currentScroll) * 0.045;
      time += 0.0035;

      // 1. Footer collision detection with progressive fade
      const footerEl = document.querySelector('footer');
      let targetOpacity = 1;
      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;
        if (footerRect.top < windowHeight) {
          const visibleFooterHeight = windowHeight - footerRect.top;
          const fadeDistance = 250;
          targetOpacity = Math.max(0, 1 - (visibleFooterHeight / fadeDistance));
        }
      }
      containerOpacity += (targetOpacity - containerOpacity) * 0.12;
      if (containerRef.current) {
        containerRef.current.style.opacity = containerOpacity.toFixed(3);
      }

      // 2. Continuous Organic Wave Deformation (Progressive & Sinuous)
      const sPhase1 = currentScroll * 0.0014;
      const sPhase2 = currentScroll * 0.0019;
      const sPhase3 = currentScroll * 0.0011;
      const sPhase4 = currentScroll * 0.0022;

      // Left Curves
      if (leftPath1.current) {
        leftPath1.current.setAttribute('d', generateWavePath(25, 28, 0.0032, time * 1.1, sPhase1, false));
      }
      if (leftPath2.current) {
        leftPath2.current.setAttribute('d', generateWavePath(55, 34, 0.0028, time * 0.9 + 1.2, sPhase2, false));
      }
      if (leftPath3.current) {
        leftPath3.current.setAttribute('d', generateWavePath(90, 24, 0.0036, time * 1.3 + 2.5, sPhase3, false));
      }
      if (leftPath4.current) {
        leftPath4.current.setAttribute('d', generateWavePath(130, 38, 0.0024, time * 0.7 + 3.8, sPhase4, false));
      }

      // Right Curves
      if (rightPath1.current) {
        rightPath1.current.setAttribute('d', generateWavePath(25, 28, 0.0032, time * 1.1 + 0.8, sPhase1, true));
      }
      if (rightPath2.current) {
        rightPath2.current.setAttribute('d', generateWavePath(55, 34, 0.0028, time * 0.9 + 2.0, sPhase2, true));
      }
      if (rightPath3.current) {
        rightPath3.current.setAttribute('d', generateWavePath(90, 24, 0.0036, time * 1.3 + 3.3, sPhase3, true));
      }
      if (rightPath4.current) {
        rightPath4.current.setAttribute('d', generateWavePath(130, 38, 0.0024, time * 0.7 + 4.6, sPhase4, true));
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-[100dvh] z-[1] pointer-events-none overflow-hidden transition-opacity duration-300"
      style={{ willChange: 'opacity', pointerEvents: 'none' }}
    >
      {/* Left Vertical Animated Wave Lines */}
      <svg
        className="absolute left-0 top-0 bottom-0 h-full w-[140px] sm:w-[220px] lg:w-[300px] pointer-events-none mix-blend-screen"
        viewBox="0 0 300 1000"
        preserveAspectRatio="none"
      >
        <path 
          ref={leftPath1} 
          d="M 25,0 C 25,100 45,100 45,200 C 45,300 15,300 15,400 C 15,500 50,500 50,600 C 50,700 20,700 20,800 C 20,900 35,900 35,1000" 
          fill="none" 
          stroke="rgba(0, 166, 214, 0.18)" 
          strokeWidth="0.8" 
        />
        <path 
          ref={leftPath2} 
          d="M 55,0 C 55,100 30,100 30,200 C 30,300 70,300 70,400 C 70,500 35,500 35,600 C 35,700 75,700 75,800 C 75,900 45,900 45,1000" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.09)" 
          strokeWidth="0.6" 
        />
        <path 
          ref={leftPath3} 
          d="M 90,0 C 90,100 110,100 110,200 C 110,300 80,300 80,400 C 80,500 105,500 105,600 C 105,700 75,700 75,800 C 75,900 95,900 95,1000" 
          fill="none" 
          stroke="rgba(0, 166, 214, 0.11)" 
          strokeWidth="0.7" 
        />
        <path 
          ref={leftPath4} 
          d="M 130,0 C 130,100 100,100 100,200 C 100,300 150,300 150,400 C 150,500 110,500 110,600 C 110,700 145,700 145,800 C 145,900 120,900 120,1000" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="0.5" 
        />
      </svg>

      {/* Right Vertical Animated Wave Lines */}
      <svg
        className="absolute right-0 top-0 bottom-0 h-full w-[140px] sm:w-[220px] lg:w-[300px] pointer-events-none mix-blend-screen"
        viewBox="0 0 300 1000"
        preserveAspectRatio="none"
      >
        <path 
          ref={rightPath1} 
          d="M 275,0 C 275,100 255,100 255,200 C 255,300 285,300 285,400 C 285,500 250,500 250,600 C 250,700 280,700 280,800 C 280,900 265,900 265,1000" 
          fill="none" 
          stroke="rgba(0, 166, 214, 0.18)" 
          strokeWidth="0.8" 
        />
        <path 
          ref={rightPath2} 
          d="M 245,0 C 245,100 270,100 270,200 C 270,300 230,300 230,400 C 230,500 265,500 265,600 C 265,700 225,700 225,800 C 225,900 255,900 255,1000" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.09)" 
          strokeWidth="0.6" 
        />
        <path 
          ref={rightPath3} 
          d="M 210,0 C 210,100 190,100 190,200 C 190,300 220,300 220,400 C 220,500 195,500 195,600 C 195,700 225,700 225,800 C 225,900 205,900 205,1000" 
          fill="none" 
          stroke="rgba(0, 166, 214, 0.11)" 
          strokeWidth="0.7" 
        />
        <path 
          ref={rightPath4} 
          d="M 170,0 C 170,100 200,100 200,200 C 200,300 150,300 150,400 C 150,500 190,500 190,600 C 190,700 155,700 155,800 C 155,900 180,900 180,1000" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="0.5" 
        />
      </svg>
    </div>
  );
}
