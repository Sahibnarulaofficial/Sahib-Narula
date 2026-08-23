import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import assistantSvgUrl from '../../../../asset/Assistant.svg';

interface AIAssistantProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AIAssistant = forwardRef<HTMLButtonElement, AIAssistantProps>(({ onClick, isOpen }, ref) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  
  useImperativeHandle(ref, () => containerRef.current!);

  // Animation state refs
  const mousePos = useRef({ x: 0, y: 0 });
  const currentEyePos = useRef({ x: 0, y: 0 });
  const targetEyePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  // Fetch and process SVG
  useEffect(() => {
    fetch(assistantSvgUrl)
      .then(res => res.text())
      .then(text => {
        // Parse the SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        
        // Wrap eyes to separate tracking translation from their native keyframe blinking
        ['.oeil0', '.oeil1'].forEach(selector => {
          const eye = doc.querySelector(selector);
          if (eye && eye.parentNode) {
            const wrapper = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
            wrapper.setAttribute('class', `eye-tracker ${selector.substring(1)}-tracker`);
            eye.parentNode.insertBefore(wrapper, eye);
            wrapper.appendChild(eye);
          }
        });

        // Ensure the SVG scales to fill our container
        const svgElement = doc.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', '100%');
        }
        
        setSvgContent(new XMLSerializer().serializeToString(doc));
      });
  }, []);

  // Mouse tracking logic
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;
      
      // Calculate distance and direction
      const dx = mousePos.current.x - botCenterX;
      const dy = mousePos.current.y - botCenterY;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      
      // Target bounds in SVG coordinates
      const maxRadiusX = 6.5;
      const maxRadiusY = 4.8;
      
      // Natural gaze intensity scaling with distance
      const gazeIntensity = Math.min(distance / 180, 1);
      
      targetEyePos.current = {
        x: Math.cos(angle) * maxRadiusX * gazeIntensity,
        y: Math.sin(angle) * maxRadiusY * gazeIntensity
      };
    };

    const handleMouseLeave = () => {
      // Return eyes to neutral smoothly when cursor leaves window
      targetEyePos.current = { x: 0, y: 0 };
    };

    const animateEyes = () => {
      // Smooth interpolation (easing)
      currentEyePos.current.x += (targetEyePos.current.x - currentEyePos.current.x) * 0.12;
      currentEyePos.current.y += (targetEyePos.current.y - currentEyePos.current.y) * 0.12;

      const curX = currentEyePos.current.x.toFixed(2);
      const curY = currentEyePos.current.y.toFixed(2);

      // Apply transform attribute to the SVG eye-tracker groups
      if (svgWrapperRef.current) {
        const trackers = svgWrapperRef.current.querySelectorAll('.eye-tracker');
        trackers.forEach(tracker => {
          tracker.setAttribute('transform', `translate(${curX}, ${curY})`);
        });
      }

      animationFrameId.current = requestAnimationFrame(animateEyes);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateEyes);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={`group
        fixed z-[9999] p-0 border-none bg-transparent outline-none cursor-pointer
        bottom-4 right-4 w-[70px] h-[70px]
        md:bottom-6 md:right-8 md:w-[90px] md:h-[90px]
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        [body.nav-menu-open_&]:opacity-0 [body.nav-menu-open_&]:pointer-events-none [body.nav-menu-open_&]:scale-0
      `}
      aria-label={isOpen ? "Close Blub AI Assistant" : "Open Blub AI Assistant"}
      aria-expanded={isOpen}
    >
      {/* Subtle red glow on hover or active chat */}
      <div 
        className={`absolute inset-0 rounded-full bg-[#E10600] blur-xl transition-opacity duration-300 pointer-events-none ${
          isOpen ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
        }`} 
      />
      
      <div 
        ref={svgWrapperRef}
        className="w-full h-full relative z-10 filter drop-shadow-lg"
        dangerouslySetInnerHTML={{ __html: svgContent }} 
      />
    </button>
  );
});

AIAssistant.displayName = 'AIAssistant';
