import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

const StatCard = ({ value, label, index }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="about-content glow-card p-8 rounded-2xl border border-border relative overflow-hidden group"
      style={{
        animationDelay: `${index * 0.1}s`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <span className="text-4xl md:text-5xl font-display font-bold text-gradient block mb-2">
          {value}
        </span>
        <p className="text-muted-foreground">{label}</p>
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl blur-xl transition-opacity duration-500 -z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation
      gsap.fromTo(
        '.about-title-word',
        {
          y: 100,
          opacity: 0,
          rotateX: -80,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content fade in with parallax
      gsap.fromTo(
        '.about-content',
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Floating animation for decorative elements
      gsap.to('.about-float', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });

      // Arrow hover animation
      gsap.to('.arrow-bounce', {
        x: 5,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '3', label: 'Languages' },
    { value: '4+', label: 'Certifications' },
    { value: '100+', label: 'Projects' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="about-float absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="about-float absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-accent/5 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="about-content text-accent text-sm uppercase tracking-widest mb-4 block reveal-line inline-block pb-1">
              About Me
            </span>
            <h2
              ref={titleRef}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
              style={{ perspective: '1000px' }}
            >
              <span className="about-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
                Bridging
              </span>{' '}
              <span className="about-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
                Technology
              </span>
              <span className="text-gradient block overflow-hidden">
                <span className="about-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
                  & Business
                </span>
              </span>
            </h2>
            <p className="about-content text-muted-foreground text-lg leading-relaxed mb-6">
              IT professional with extensive experience in network administration, technical support,
              and system management. I specialize in troubleshooting complex technical issues,
              managing enterprise IT infrastructure, and leading technical teams.
            </p>
            <p className="about-content text-muted-foreground text-lg leading-relaxed mb-8">
              Currently managing tourism operations in Turkey, combining my technical expertise
              with business acumen to deliver exceptional customer experiences and streamlined
              digital solutions.
            </p>
            <div className="about-content">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-accent hover:gap-4 transition-all duration-300 btn-interactive px-6 py-3 rounded-full border border-accent/30 hover:border-accent hover:bg-accent/10"
              >
                <span className="relative z-10">Let's work together</span>
                <svg
                  className="w-5 h-5 arrow-bounce relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
