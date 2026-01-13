import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 3.5 // Wait for overlay to complete
      });

      // Animate floating particles
      gsap.to('.particle', {
        y: 'random(-100, 100)',
        x: 'random(-50, 50)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, transformOrigin: 'left center' }
      )
        // Premium image reveal animation
        .fromTo(
          imageRef.current,
          {
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 0,
            scale: 1.3,
            filter: 'blur(20px) brightness(0.5)',
          },
          {
            clipPath: 'circle(100% at 50% 50%)',
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            duration: 1.8,
            ease: 'power4.out',
          },
          '-=0.6'
        )
        // Add glow effect to image after reveal
        .fromTo(
          '.image-glow',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          '-=1'
        )
        // Animate image decorations
        .fromTo(
          '.image-corner',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
          '-=0.5'
        )
        .fromTo(
          '.name-char',
          { y: 120, opacity: 0, rotateY: 90 },
          { y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)' },
          '-=0.8'
        )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta',
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          '.scroll-indicator',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-text-content', {
        y: 50,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'center top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const firstName = 'Mustafa';
  const lastName = 'Sameer';

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      {/* Animated gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="hero-text-content order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={nameRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              style={{ perspective: '1000px' }}
            >
              <span className="inline-block overflow-hidden">
                {firstName.split('').map((char, i) => (
                  <span key={i} className="name-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                    {char}
                  </span>
                ))}
              </span>
              <span className="block text-accent overflow-hidden">
                {lastName.split('').map((char, i) => (
                  <span key={i} className="name-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                    {char}
                  </span>
                ))}
              </span>
            </h1>
            <p
              ref={titleRef}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-8 max-w-md mx-auto lg:mx-0"
            >
              IT Professional & Tourism Manager with 15+ years of expertise in technology and business operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap">
              <a
                href="#contact"
                className="hero-cta group px-8 py-4 bg-accent text-accent-foreground font-medium rounded-full hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent bg-[length:200%_100%] animate-shimmer" />
              </a>
              <a
                href="/Resume MUSTAFA SAMEER.pdf"
                download="Mustafa_Sameer_CV.pdf"
                className="hero-cta group px-8 py-4 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent text-accent font-medium rounded-full hover:scale-105 hover:from-accent hover:to-accent hover:text-accent-foreground transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transform group-hover:translate-y-0.5 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a
                href="#experience"
                className="hero-cta px-8 py-4 border border-border text-foreground font-medium rounded-full hover:border-accent hover:text-accent transition-all duration-300 group"
              >
                <span className="inline-flex items-center gap-2">
                  View Experience
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Glow effect behind image */}
            <div className="image-glow absolute inset-0 flex justify-center lg:justify-end">
              <div className="w-72 h-96 md:w-96 md:h-[500px] rounded-2xl bg-accent/20 blur-3xl" />
            </div>

            <div
              ref={imageRef}
              className="relative w-72 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] group cursor-pointer"
              style={{
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-10px) scale(1.02)';
                target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px hsl(43 74% 49% / 0.15)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) scale(1)';
                target.style.boxShadow = 'var(--shadow-elegant)';
              }}
            >
              {/* Image with smooth effects */}
              <img
                src={profileImage}
                alt="Mustafa Sameer"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay that fades on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent group-hover:opacity-60 transition-opacity duration-500" />

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"
                style={{ transition: 'opacity 0.5s, transform 1s ease' }} />

              {/* Glowing border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500" />

              {/* Image frame decoration with animation */}
              <div className="absolute inset-4 border border-accent/20 rounded-xl pointer-events-none group-hover:inset-3 group-hover:border-accent/40 transition-all duration-500" />

              {/* Corner accents that animate in */}
              <div className="image-corner absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/50 rounded-tl-lg" />
              <div className="image-corner absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg" />
              <div className="image-corner absolute bottom-16 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg" />
              <div className="image-corner absolute bottom-16 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/50 rounded-br-lg" />

              {/* LinkedIn button with hover effect */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/in/mustafa-sameer-al-qaisi-1680b113a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm border border-accent/20 
                             text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-background/60 
                             transition-all duration-300 group/linkedin"
                >
                  <svg
                    className="w-5 h-5 group-hover/linkedin:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
