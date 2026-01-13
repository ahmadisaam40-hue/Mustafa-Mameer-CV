import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillTagProps {
  skill: string;
  index: number;
}

const SkillTag = ({ skill, index }: SkillTagProps) => {
  const tagRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = tag.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(tag, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(tag, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    tag.addEventListener('mousemove', handleMouseMove);
    tag.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tag.removeEventListener('mousemove', handleMouseMove);
      tag.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span
      ref={tagRef}
      className="skill-item px-5 py-2.5 text-sm border border-border rounded-full text-muted-foreground 
                 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300
                 cursor-default relative overflow-hidden group"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shimmer effect on hover */}
      <span
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent 
                    transition-transform duration-500 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        style={{ transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)' }}
      />
      <span className="relative z-10">{skill}</span>
    </span>
  );
};

interface CertCardProps {
  cert: { name: string; status: string; icon: string };
  index: number;
}

const CertCard = ({ cert, index }: CertCardProps) => {
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

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
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
      className="cert-card glow-card p-6 rounded-xl border border-border text-center relative overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 
                    transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Icon with bounce effect */}
      <span
        className="text-4xl mb-4 block relative z-10 transition-transform duration-300"
        style={{ transform: isHovered ? 'scale(1.2) translateZ(40px)' : 'scale(1) translateZ(20px)' }}
      >
        {cert.icon}
      </span>

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <h4 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
          {cert.name}
        </h4>
        <span className="text-xs text-accent uppercase tracking-wider flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {cert.status}
        </span>
      </div>

      {/* Bottom glow line */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-500 ${isHovered ? 'w-3/4' : 'w-0'}`}
      />

      {/* Corner decorations */}
      <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-lg transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
      <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-lg transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
    </div>
  );
};

interface LanguageCardProps {
  lang: { name: string; level: string };
  index: number;
}

const LanguageCard = ({ lang, index }: LanguageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="skill-item text-center relative group cursor-default"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative inline-block">
        <span
          className="block text-3xl font-display font-bold text-foreground mb-1 transition-all duration-300"
          style={{
            textShadow: isHovered ? '0 0 30px hsl(43 74% 49% / 0.5)' : 'none',
            color: isHovered ? 'hsl(43 74% 49%)' : undefined,
          }}
        >
          {lang.name}
        </span>

        {/* Underline animation */}
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto transition-all duration-500 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
        />
      </div>
      <span className="text-sm text-muted-foreground block mt-2">{lang.level}</span>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute -inset-4 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/50 animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.skills-title',
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Skill items with wave animation
      gsap.fromTo(
        '.skill-item',
        {
          scale: 0.5,
          opacity: 0,
          rotateY: 90,
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: {
            each: 0.05,
            from: 'start',
            grid: 'auto',
            ease: 'power2.inOut',
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cert cards with 3D flip
      gsap.fromTo(
        '.cert-card',
        {
          rotateY: -90,
          opacity: 0,
          scale: 0.8,
        },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-section',
            start: 'top 80%',
          },
        }
      );

      // Background orbs floating
      gsap.to('.skills-orb', {
        y: 'random(-40, 40)',
        x: 'random(-30, 30)',
        rotation: 'random(-10, 10)',
        duration: 'random(4, 7)',
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

  const technicalSkills = [
    'Troubleshooting',
    'Network Administration',
    'Active Directory',
    'Microsoft Windows Server',
    'Computer Networking',
    'VoIP',
    'Help Desk',
    'Microsoft Office',
    'Data Entry',
  ];

  const courses = ['Web Developer', 'Python', 'Cyber Security'];

  const certifications = [
    { name: 'CCNA', status: 'Certified', icon: '🌐' },
    { name: 'CCNP', status: 'Certified', icon: '🔧' },
    { name: 'CCNA Security', status: 'Certified', icon: '🔒' },
    { name: 'MCP', status: 'Certified', icon: '💻' },
  ];

  const languages = [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Turkish', level: 'Proficient' },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="skills-orb absolute top-10 left-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="skills-orb absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        <div className="skills-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-accent/5 to-transparent blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="skills-title text-accent text-sm uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="skills-title font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Skills & <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        {/* Technical Skills */}
        <div className="mb-20">
          <h3 className="skill-item text-xl font-display font-semibold text-center mb-8">
            Technical Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technicalSkills.map((skill, index) => (
              <SkillTag key={skill} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="mb-20">
          <h3 className="skill-item text-xl font-display font-semibold text-center mb-8">
            Training & Courses
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {courses.map((course, index) => (
              <span
                key={course}
                className="skill-item px-8 py-4 bg-accent/10 text-accent rounded-full border border-accent/30 
                           hover:bg-accent/20 hover:border-accent hover:scale-105 transition-all duration-300
                           relative overflow-hidden group cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 
                                 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10 font-medium">{course}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="cert-section mb-20">
          <h3 className="cert-card text-xl font-display font-semibold text-center mb-8">
            Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <CertCard key={cert.name} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="skill-item text-xl font-display font-semibold text-center mb-8">
            Languages
          </h3>
          <div className="flex flex-wrap justify-center gap-12 max-w-2xl mx-auto">
            {languages.map((lang, index) => (
              <LanguageCard key={lang.name} lang={lang} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
