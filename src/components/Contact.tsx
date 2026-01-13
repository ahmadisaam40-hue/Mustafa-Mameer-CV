import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactCardProps {
  info: {
    icon: JSX.Element;
    label: string;
    value: string;
    href: string;
  };
  index: number;
}

const ContactCard = ({ info, index }: ContactCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
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

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

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
    <a
      ref={cardRef}
      href={info.href}
      className="contact-item glow-card p-8 rounded-2xl border border-border hover:border-accent/50 
                 transition-all duration-500 group relative overflow-hidden block"
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

      {/* Ripple effect on hover */}
      <div
        className={`absolute inset-0 bg-accent/5 rounded-full transition-transform duration-700 
                    ${isHovered ? 'scale-150' : 'scale-0'}`}
        style={{ transformOrigin: 'var(--mouse-x, 50%) var(--mouse-y, 50%)' }}
      />

      {/* Icon container with glow */}
      <div
        className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full 
                   bg-accent/10 text-accent mb-6 transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(1.15) translateZ(40px)' : 'scale(1) translateZ(20px)',
          boxShadow: isHovered ? '0 0 40px hsl(43 74% 49% / 0.4)' : 'none',
        }}
      >
        {info.icon}

        {/* Rotating border */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-accent/30 transition-opacity duration-300 
                      ${isHovered ? 'opacity-100 animate-spin' : 'opacity-0'}`}
          style={{
            borderTopColor: 'hsl(43 74% 49%)',
            animationDuration: '3s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <p className="text-sm text-muted-foreground mb-2">{info.label}</p>
        <p className="text-foreground font-medium text-lg group-hover:text-accent transition-colors duration-300">
          {info.value}
        </p>
      </div>

      {/* Bottom reveal line */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent 
                    transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
      />

      {/* Corner accents */}
      <div
        className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-lg 
                    transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      />
      <div
        className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-lg 
                    transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      />
    </a>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split text animation
      gsap.fromTo(
        '.contact-title-word',
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Contact items stagger with scale
      gsap.fromTo(
        '.contact-item',
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      // Floating background elements
      gsap.to('.contact-orb', {
        y: 'random(-50, 50)',
        x: 'random(-30, 30)',
        rotation: 'random(-15, 15)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Parallax lines
      gsap.to('.contact-line', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const contactInfo = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'mustafa_alqaisi89@yahoo.com',
      href: 'mailto:mustafa_alqaisi89@yahoo.com',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+964 782 333 2861',
      href: 'tel:+9647823332861',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'IRAQ',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-card/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="contact-orb absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="contact-orb absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        <div className="contact-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-radial from-accent/5 to-transparent blur-3xl opacity-40" />

        {/* Decorative lines */}
        <div className="contact-line absolute top-0 left-1/4 w-px h-96 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        <div className="contact-line absolute top-0 right-1/3 w-px h-80 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="contact-item text-accent text-sm uppercase tracking-widest mb-4 block">
            Get In Touch
          </span>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ perspective: '1000px' }}
          >
            <span className="contact-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
              Let's
            </span>{' '}
            <span className="contact-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
              Work
            </span>{' '}
            <span className="text-gradient contact-title-word inline-block" style={{ transformStyle: 'preserve-3d' }}>
              Together
            </span>
          </h2>
          <p className="contact-item text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Ready to bring your projects to life? Whether you need IT expertise,
            technical consulting, or tourism management solutions, I'm here to help.
          </p>

          <div className="contact-item grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <ContactCard key={info.label} info={info} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
