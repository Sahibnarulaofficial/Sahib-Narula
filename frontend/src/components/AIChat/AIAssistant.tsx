import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import assistantSvgUrl from '../../../../asset/Assistant.svg';

interface AIAssistantProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnread?: boolean;
  bubbleMessage?: string | null;
  isBubbleVisible?: boolean;
  onCloseBubble?: () => void;
}

export const AIAssistant = forwardRef<HTMLButtonElement, AIAssistantProps>(({
  onClick,
  isOpen,
  hasUnread = false,
  bubbleMessage = null,
  isBubbleVisible = false,
  onCloseBubble,
}, ref) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  
  useImperativeHandle(ref, () => containerRef.current!);

  // DOM node references inside the SVG
  const oeil0Ref = useRef<SVGElement | null>(null);
  const oeil1Ref = useRef<SVGElement | null>(null);

  // Animation controller state (all kept in refs for 60fps performance without React re-renders)
  const animationFrameId = useRef<number>();
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // Cursor tracking refs
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef<number>(0);
  const isMouseInWindow = useRef<boolean>(true);
  const cursorBlend = useRef<number>(0); // 0 (idle) to 1 (full cursor tracking)
  const cursorTarget = useRef({ x: 0, y: 0 });

  // Autonomous idle look refs
  const idleTarget = useRef({
    x: 0,
    y: 0,
    asym0X: 0,
    asym0Y: 0,
    asym1X: 0,
    asym1Y: 0,
  });

  // Current smooth interpolated positions
  const currentEye0 = useRef({ x: 0, y: 0 });
  const currentEye1 = useRef({ x: 0, y: 0 });

  // Blink & Squint state machine
  const blinkState = useRef({
    active: false,
    mode: 'none' as 'none' | 'blink' | 'squint',
    startTime: 0,
    closeDuration: 120,
    holdDuration: 60,
    openDuration: 130,
    squintDuration: 500,
    isDouble: false,
    hasDoubleFired: false,
    staggerOffset: 0, // Micro-delay between left and right eyes
    scaleY0: 1.0,
    scaleY1: 1.0,
  });

  // Fetch, sanitize, and inject SVG
  useEffect(() => {
    fetch(assistantSvgUrl)
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');

        // Remove the static CSS @keyframes so they do not conflict with our controller
        const styleTag = doc.querySelector('style');
        if (styleTag) {
          styleTag.remove();
        }

        // Ensure proper scaling within container
        const svgElement = doc.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', '100%');
        }

        setSvgContent(new XMLSerializer().serializeToString(doc));
      })
      .catch(err => {
        console.error('[Blub AI Assistant] Failed to load SVG:', err);
      });
  }, []);

  // Cache SVG eye DOM element references when SVG content changes
  useEffect(() => {
    if (!svgWrapperRef.current) return;
    oeil0Ref.current = svgWrapperRef.current.querySelector('.oeil0');
    oeil1Ref.current = svgWrapperRef.current.querySelector('.oeil1');
  }, [svgContent]);

  // Main Animation Controller Engine
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // Static neutral render for reduced motion
    if (prefersReducedMotion) {
      if (oeil0Ref.current) {
        oeil0Ref.current.setAttribute('transform', 'matrix(0.98, -0.10, 0.08, 0.99, -15.5, -7.5)');
      }
      if (oeil1Ref.current) {
        oeil1Ref.current.setAttribute('transform', 'matrix(0.92, -0.04, 0.09, 0.99, 36.0, -11.5)');
      }
      return;
    }

    // ── 1. Autonomous Idle Look Scheduler ─────────────────────────────────────
    let idleTimeout: ReturnType<typeof setTimeout>;

    const scheduleNextIdleLook = () => {
      // Randomized interval between 2000ms and 4500ms
      const delay = 2000 + Math.random() * 2500;
      idleTimeout = setTimeout(() => {
        // Only trigger autonomous looking when user is not actively moving the cursor
        const now = performance.now();
        const timeSinceMove = now - lastMouseMoveTime.current;

        if (isMobile || timeSinceMove > 1800 || !isMouseInWindow.current) {
          if (!isOpenRef.current) {
            const rand = Math.random();
            if (rand < 0.45) {
              // 45% return to center
              idleTarget.current.x = 0;
              idleTarget.current.y = 0;
            } else if (rand < 0.65) {
              // 20% look slightly left
              idleTarget.current.x = -(1.5 + Math.random() * 2.5);
              idleTarget.current.y = (Math.random() - 0.5) * 1.5;
            } else if (rand < 0.85) {
              // 20% look slightly right
              idleTarget.current.x = 1.5 + Math.random() * 2.5;
              idleTarget.current.y = (Math.random() - 0.5) * 1.5;
            } else {
              // 15% look slightly upward
              idleTarget.current.x = (Math.random() - 0.5) * 1.8;
              idleTarget.current.y = -(1.5 + Math.random() * 2.2);
            }

            // Organic Micro-Asymmetry between the two eyes (±0.4 SVG units)
            idleTarget.current.asym0X = (Math.random() - 0.5) * 0.7;
            idleTarget.current.asym0Y = (Math.random() - 0.5) * 0.5;
            idleTarget.current.asym1X = (Math.random() - 0.5) * 0.7;
            idleTarget.current.asym1Y = (Math.random() - 0.5) * 0.5;
          } else {
            // Calm neutral center when chat window is open
            idleTarget.current.x = 0;
            idleTarget.current.y = 0;
            idleTarget.current.asym0X = 0;
            idleTarget.current.asym0Y = 0;
            idleTarget.current.asym1X = 0;
            idleTarget.current.asym1Y = 0;
          }
        }
        scheduleNextIdleLook();
      }, delay);
    };

    scheduleNextIdleLook();

    // ── 2. Blink & Squint Scheduler ──────────────────────────────────────────
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleNextBlink = () => {
      // Randomized blink interval every 3 to 6 seconds
      const delay = 3000 + Math.random() * 3000;
      blinkTimeout = setTimeout(() => {
        if (!blinkState.current.active) {
          const rand = Math.random();
          if (rand < 0.12) {
            // 12% Occasional subtle squint
            blinkState.current = {
              active: true,
              mode: 'squint',
              startTime: performance.now(),
              closeDuration: 140,
              holdDuration: 180,
              openDuration: 160,
              squintDuration: 480,
              isDouble: false,
              hasDoubleFired: false,
              staggerOffset: (Math.random() - 0.5) * 18,
              scaleY0: 1.0,
              scaleY1: 1.0,
            };
          } else {
            // Standard blink (with 18% chance of an organic double-blink)
            const isDouble = Math.random() < 0.18;
            blinkState.current = {
              active: true,
              mode: 'blink',
              startTime: performance.now(),
              closeDuration: 110 + Math.random() * 25,
              holdDuration: 55 + Math.random() * 25,
              openDuration: 120 + Math.random() * 35,
              squintDuration: 0,
              isDouble,
              hasDoubleFired: false,
              staggerOffset: (Math.random() - 0.5) * 16,
              scaleY0: 1.0,
              scaleY1: 1.0,
            };
          }
        }
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();

    // ── 3. Mouse Movement Tracking (Desktop) ──────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveTime.current = performance.now();
      isMouseInWindow.current = true;

      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const dx = mousePos.current.x - botCenterX;
      const dy = mousePos.current.y - botCenterY;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Max boundaries in SVG units (eyes strictly remain within sockets)
      const maxRadiusX = 5.2;
      const maxRadiusY = 3.8;

      // Smooth gaze intensity scaling with distance from avatar
      const gazeIntensity = Math.min(distance / 200, 1.0);

      cursorTarget.current = {
        x: Math.cos(angle) * maxRadiusX * gazeIntensity,
        y: Math.sin(angle) * maxRadiusY * gazeIntensity,
      };
    };

    const handleMouseLeave = () => {
      isMouseInWindow.current = false;
      cursorTarget.current = { x: 0, y: 0 };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // ── 4. Main RequestAnimationFrame Rendering Loop ─────────────────────────
    const animate = () => {
      const now = performance.now();

      // Check if cursor tracking is active (recent mouse move + cursor in window)
      const timeSinceMove = now - lastMouseMoveTime.current;
      const isCursorActive = !isMobile && isMouseInWindow.current && timeSinceMove < 2000;

      // Smooth priority blend between cursor tracking and autonomous idle
      if (isCursorActive) {
        cursorBlend.current += (1.0 - cursorBlend.current) * 0.08;
      } else {
        cursorBlend.current += (0.0 - cursorBlend.current) * 0.04;
      }

      const blend = cursorBlend.current;

      // Calculate combined target positions with subtle organic asymmetry
      const target0X = cursorTarget.current.x * blend + (idleTarget.current.x + idleTarget.current.asym0X) * (1.0 - blend);
      const target0Y = cursorTarget.current.y * blend + (idleTarget.current.y + idleTarget.current.asym0Y) * (1.0 - blend);

      const target1X = cursorTarget.current.x * blend + (idleTarget.current.x + idleTarget.current.asym1X) * (1.0 - blend);
      const target1Y = cursorTarget.current.y * blend + (idleTarget.current.y + idleTarget.current.asym1Y) * (1.0 - blend);

      // Smooth lerp follow
      currentEye0.current.x += (target0X - currentEye0.current.x) * 0.10;
      currentEye0.current.y += (target0Y - currentEye0.current.y) * 0.10;

      currentEye1.current.x += (target1X - currentEye1.current.x) * 0.10;
      currentEye1.current.y += (target1Y - currentEye1.current.y) * 0.10;

      // Clamping limits (guarantees eyes NEVER leave sockets)
      const clamped0X = Math.max(-5.5, Math.min(5.5, currentEye0.current.x));
      const clamped0Y = Math.max(-4.0, Math.min(4.0, currentEye0.current.y));

      const clamped1X = Math.max(-5.5, Math.min(5.5, currentEye1.current.x));
      const clamped1Y = Math.max(-4.0, Math.min(4.0, currentEye1.current.y));

      // ── Process Blink / Squint Shape Animation ─────────────────────────────
      let scaleY0 = 1.0;
      let scaleY1 = 1.0;

      const blink = blinkState.current;
      if (blink.active) {
        const elapsed = now - blink.startTime;
        const stagger = blink.staggerOffset;

        if (blink.mode === 'blink') {
          const totalBlinkTime = blink.closeDuration + blink.holdDuration + blink.openDuration;

          const computeBlinkScale = (time: number) => {
            if (time < 0) return 1.0;
            if (time <= blink.closeDuration) {
              // Closing phase: 1.0 -> 0.08
              const progress = time / blink.closeDuration;
              return 1.0 - progress * 0.92;
            } else if (time <= blink.closeDuration + blink.holdDuration) {
              // Closed hold phase: thin compressed slit
              return 0.08;
            } else if (time <= totalBlinkTime) {
              // Opening phase: 0.08 -> 1.0
              const progress = (time - blink.closeDuration - blink.holdDuration) / blink.openDuration;
              return 0.08 + progress * 0.92;
            }
            return 1.0;
          };

          scaleY0 = computeBlinkScale(elapsed);
          scaleY1 = computeBlinkScale(elapsed + stagger);

          if (elapsed > totalBlinkTime + Math.abs(stagger)) {
            if (blink.isDouble && !blink.hasDoubleFired) {
              // Trigger second quick blink
              blink.hasDoubleFired = true;
              blink.startTime = now + 40;
            } else {
              blink.active = false;
              scaleY0 = 1.0;
              scaleY1 = 1.0;
            }
          }
        } else if (blink.mode === 'squint') {
          // Subtle squint: compress eye vertically to ~0.60 and release
          const squintTotal = blink.squintDuration;
          if (elapsed <= squintTotal * 0.3) {
            const p = elapsed / (squintTotal * 0.3);
            scaleY0 = 1.0 - p * 0.40;
            scaleY1 = 1.0 - p * 0.38;
          } else if (elapsed <= squintTotal * 0.7) {
            scaleY0 = 0.60;
            scaleY1 = 0.62;
          } else if (elapsed <= squintTotal) {
            const p = (elapsed - squintTotal * 0.7) / (squintTotal * 0.3);
            scaleY0 = 0.60 + p * 0.40;
            scaleY1 = 0.62 + p * 0.38;
          } else {
            blink.active = false;
            scaleY0 = 1.0;
            scaleY1 = 1.0;
          }
        }
      }

      // ── Apply Combined Preserved Matrix Transforms to SVG Eyes ─────────────
      // Preserves original base matrix geometry while applying offsets & vertical compression
      if (oeil0Ref.current) {
        const sY = scaleY0;
        const b = (-0.10 * sY).toFixed(3);
        const c = (0.08 * sY).toFixed(3);
        const d = (0.99 * sY).toFixed(3);
        const tx = clamped0X.toFixed(2);
        const ty = clamped0Y.toFixed(2);
        oeil0Ref.current.setAttribute('transform', `translate(${tx}, ${ty}) matrix(0.98, ${b}, ${c}, ${d}, -15.5, -7.5)`);
      }

      if (oeil1Ref.current) {
        const sY = scaleY1;
        const b = (-0.04 * sY).toFixed(3);
        const c = (0.09 * sY).toFixed(3);
        const d = (0.99 * sY).toFixed(3);
        const tx = clamped1X.toFixed(2);
        const ty = clamped1Y.toFixed(2);
        oeil1Ref.current.setAttribute('transform', `translate(${tx}, ${ty}) matrix(0.92, ${b}, ${c}, ${d}, 36.0, -11.5)`);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      clearTimeout(idleTimeout);
      clearTimeout(blinkTimeout);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [svgContent]);

  return (
    <>
      {/* Temporary Floating Speech Bubble */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed z-[9999]
          bottom-[86px] right-4 md:bottom-[108px] md:right-8
          max-w-[260px] md:max-w-[300px]
          p-3.5 rounded-2xl rounded-br-sm
          bg-brand-surface/95 backdrop-blur-md
          border border-brand-detail shadow-2xl
          text-xs leading-relaxed text-content-primary
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right
          ${isBubbleVisible && !isOpen && bubbleMessage 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto blur-0' 
            : 'opacity-0 scale-90 translate-y-3 pointer-events-none blur-[1px]'}
          [body.nav-menu-open_&]:opacity-0 [body.nav-menu-open_&]:pointer-events-none
          cursor-pointer hover:border-accent/50
        `}
        onClick={() => {
          onCloseBubble?.();
          onClick();
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Blub AI
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloseBubble?.();
            }}
            className="text-content-secondary hover:text-content-primary p-0.5 -mt-1 -mr-1 transition-colors"
            aria-label="Dismiss preview message"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-content-primary text-[12px] font-normal leading-snug">
          {bubbleMessage}
        </p>

        {/* Pointer tail pointing down towards the avatar */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-brand-surface border-r border-b border-brand-detail transform rotate-45" />
      </div>

      {/* Main Floating Assistant Button */}
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
        aria-label={isOpen ? "Close Blub AI" : "Open Blub AI"}
        aria-expanded={isOpen}
      >
        {/* Subtle red glow on hover or active chat */}
        <div 
          className={`absolute inset-0 rounded-full bg-[#E10600] blur-xl transition-opacity duration-300 pointer-events-none ${
            isOpen ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
          }`} 
        />
        
        {/* Unseen / Unread Message Red Dot Notification */}
        {hasUnread && !isOpen && (
          <div 
            className="absolute top-1 right-1 md:top-2 md:right-2 z-20 flex h-3.5 w-3.5 pointer-events-none"
            aria-label="Unread message"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent border-2 border-brand-base shadow-md" />
          </div>
        )}

        <div 
          ref={svgWrapperRef}
          className="w-full h-full relative z-10 filter drop-shadow-lg"
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      </button>
    </>
  );
});

AIAssistant.displayName = 'AIAssistant';
