import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-10 border-t border-border relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="footer-content text-muted-foreground text-sm flex items-center gap-1">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://ahmadisaam40-hue.github.io/CV/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span
                className="font-medium transition-colors duration-300"
                style={{ color: isHovered ? 'hsl(43 74% 49%)' : undefined }}
              >
                HUSSEIN ALMALIKY
              </span>
              {/* Animated underline */}
              <span
                className="absolute bottom-0 left-0 h-px bg-accent transition-all duration-300"
                style={{ width: isHovered ? '100%' : '0%' }}
              />
              {/* Glow effect */}
              <span
                className="absolute inset-0 blur-lg transition-opacity duration-300"
                style={{
                  background: 'hsl(43 74% 49% / 0.3)',
                  opacity: isHovered ? 1 : 0,
                }}
              />
            </a>
            . All rights reserved.
          </p>
          <p className="footer-content text-muted-foreground text-sm flex items-center gap-2">
            <span className="inline-block animate-pulse">✨</span>
            Designed with precision and passion
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
