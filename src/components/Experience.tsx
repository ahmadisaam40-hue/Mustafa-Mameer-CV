import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface TimelineCardProps {
  exp: ExperienceItem;
  index: number;
}

const TimelineCard = ({ exp, index }: TimelineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="exp-item relative pl-8 pb-12 last:pb-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline line with glow */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-accent/50 transition-colors duration-500">
        <div
          className={`absolute inset-0 bg-accent blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Timeline dot with pulse */}
      <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300">
        <div className={`absolute inset-0 rounded-full bg-accent animate-ping ${isHovered ? 'opacity-75' : 'opacity-0'}`} />
        <div className={`absolute -inset-2 rounded-full bg-accent/30 blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content card with glow effect */}
      <div
        className="glow-card p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-500 relative overflow-hidden ml-4"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(43 74% 49% / 0.05) 100%)'
            : 'hsl(var(--card))',
        }}
      >
        {/* Hover gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
              {exp.title}
            </h3>
            <span className="text-accent text-sm font-mono tracking-wider">
              {exp.period}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {exp.company}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* Bottom reveal line */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
        />
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text effect
      gsap.fromTo(
        '.exp-title-char',
        {
          y: 100,
          opacity: 0,
          rotateY: 90,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Experience items stagger animation
      gsap.fromTo(
        '.exp-item',
        {
          x: -80,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Parallax effect on scroll
      gsap.to('.exp-parallax', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Floating orbs animation
      gsap.to('.exp-orb', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences: ExperienceItem[] = [
    {
      title: 'Section Head - Knowledge Management Customer Care',
      company: 'Earthlink Telecommunication, Iraq',
      period: '2024 - Present',
      description: 'Leading knowledge management initiatives for customer care operations. Developing and maintaining knowledge bases, training materials, and best practices to enhance customer service quality and team performance.',
    },
    {
      title: 'Tourist Company Manager',
      company: 'ALMASA, Turkey',
      period: 'Jul 2018 - Present',
      description: 'Booking airline tickets, booking hotels and preparing tourism programs. Managing digital operations and customer relations.',
    },
    {
      title: 'IT Team Leader',
      company: 'Iraqi Ministry of Interior, Baghdad',
      period: 'Jan 2014 - Jan 2015',
      description: 'Coordinated and delegated IT team responsibilities. Oversaw day-to-day functions and conducted training sessions.',
    },
    {
      title: 'IT Support',
      company: 'Iraqi Ministry of Interior, Baghdad',
      period: 'Dec 2012 - Jan 2014',
      description: 'Editing and analyzing recruits data, creating electronic tables, and coordinating with departments.',
    },
    {
      title: 'Customer Service',
      company: 'Al Mouyasser, Baghdad',
      period: 'Sep 2011 - Aug 2012',
      description: 'Listened to customer concerns, answered questions and provided product/service information.',
    },
    {
      title: 'Support Team',
      company: 'ITISALUNA, Baghdad',
      period: 'Apr 2011 - Sep 2011',
      description: 'Solved subscriber problems transferred through the call center department.',
    },
    {
      title: 'Call Center Representative',
      company: 'ITISALUNA, Baghdad',
      period: 'Aug 2010 - Apr 2011',
      description: 'Handled inbound and outbound phone conversations with clients to ensure quick assistance.',
    },
  ];

  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="exp-title-char inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-32 bg-card/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="exp-orb absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="exp-orb absolute bottom-40 left-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        <div className="exp-parallax absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        <div className="exp-parallax absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="exp-item text-accent text-sm uppercase tracking-widest mb-4 block">
            Career Path
          </span>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ perspective: '1000px' }}
          >
            <span className="overflow-hidden inline-block">
              {splitTitle('Professional ')}
            </span>
            <span className="text-gradient overflow-hidden inline-block">
              {splitTitle('Experience')}
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
