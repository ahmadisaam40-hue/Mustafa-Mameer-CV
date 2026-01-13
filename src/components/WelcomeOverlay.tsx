import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface WelcomeOverlayProps {
  onComplete: () => void;
}

const WelcomeOverlay = ({ onComplete }: WelcomeOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Counter animation
      const counterAnimation = { value: 0 };
      gsap.to(counterAnimation, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounter(Math.round(counterAnimation.value));
        },
      });

      // Initial state
      gsap.set([lineTopRef.current, lineBottomRef.current], { scaleX: 0 });
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      gsap.set('.letter', { y: 100, opacity: 0, rotateX: -90 });
      gsap.set('.subtitle-word', { y: 30, opacity: 0 });
      gsap.set('.loading-bar', { scaleX: 0 });

      // Animation sequence
      tl.to(lineTopRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
      })
        .to(
          lineBottomRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.inOut',
            transformOrigin: 'right center',
          },
          '<'
        )
        .to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
        .to(
          '.letter',
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.subtitle-word',
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          '.loading-bar',
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          },
          '-=0.8'
        )
        .to('.counter-text', {
          opacity: 0,
          duration: 0.3,
        })
        .to(
          [logoRef.current, textRef.current],
          {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '-=0.1'
        )
        .to(
          [lineTopRef.current, lineBottomRef.current],
          {
            scaleX: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '-=0.3'
        )
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  const name = 'MUSTAFA SAMEER';
  const subtitle = ['IT', 'Professional', '&', 'Tourism', 'Expert'];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative lines */}
      <div
        ref={lineTopRef}
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />
      <div
        ref={lineBottomRef}
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo/Monogram */}
        <div
          ref={logoRef}
          className="mb-8 w-24 h-24 rounded-full border-2 border-accent flex items-center justify-center"
        >
          <span className="font-display text-4xl font-bold text-gradient">MS</span>
        </div>

        {/* Name with letter animation */}
        <div ref={textRef} className="text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 perspective-1000">
            {name.split('').map((letter, index) => (
              <span
                key={index}
                className="letter inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg md:text-xl tracking-wide">
            {subtitle.map((word, index) => (
              <span key={index} className="subtitle-word">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Loading bar */}
        <div className="mt-12 w-48 md:w-64 h-px bg-border relative overflow-hidden">
          <div className="loading-bar absolute inset-0 bg-accent" />
        </div>

        {/* Counter */}
        <div className="counter-text mt-4 text-sm text-muted-foreground font-mono">
          <span ref={counterRef}>{counter}</span>%
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/30" />
    </div>
  );
};

export default WelcomeOverlay;
