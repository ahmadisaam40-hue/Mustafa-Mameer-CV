import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Magnetic hover effect for elements
export const useMagneticHover = <T extends HTMLElement>(strength: number = 0.3) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return elementRef;
};

// 3D tilt effect for cards
export const useTiltEffect = <T extends HTMLElement>(maxTilt: number = 15) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            gsap.to(element, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power3.out',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt]);

    return elementRef;
};

// Scroll reveal animation
export const useScrollReveal = <T extends HTMLElement>(
    animationType: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate3D' = 'fadeUp',
    options?: {
        delay?: number;
        duration?: number;
        stagger?: number;
        start?: string;
    }
) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const { delay = 0, duration = 1, stagger = 0.1, start = 'top 85%' } = options || {};

        const animations: Record<string, gsap.TweenVars> = {
            fadeUp: { y: 80, opacity: 0 },
            fadeIn: { opacity: 0 },
            slideLeft: { x: -100, opacity: 0 },
            slideRight: { x: 100, opacity: 0 },
            scale: { scale: 0.8, opacity: 0 },
            rotate3D: { rotationY: 90, opacity: 0, transformPerspective: 1000 },
        };

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element,
                animations[animationType],
                {
                    y: 0,
                    x: 0,
                    scale: 1,
                    rotationY: 0,
                    opacity: 1,
                    duration,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [animationType, options]);

    return elementRef;
};

// Text split and animate
export const useTextReveal = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const text = element.textContent || '';
        element.innerHTML = text
            .split('')
            .map((char) => `<span class="char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

        const chars = element.querySelectorAll('.char');

        const ctx = gsap.context(() => {
            gsap.fromTo(
                chars,
                { y: 100, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return elementRef;
};

// Parallax effect
export const useParallax = <T extends HTMLElement>(speed: number = 0.5) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.to(element, {
                y: () => window.innerHeight * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return elementRef;
};

// Glowing border effect
export const useGlowingBorder = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        };

        element.addEventListener('mousemove', handleMouseMove);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return elementRef;
};

// Counter animation
export const useCountUp = (
    endValue: number,
    duration: number = 2,
    startOnView: boolean = true
) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const animate = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            const obj = { value: 0 };
            gsap.to(obj, {
                value: endValue,
                duration,
                ease: 'power3.out',
                onUpdate: () => {
                    element.textContent = Math.round(obj.value).toString();
                },
            });
        };

        if (startOnView) {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: animate,
            });
        } else {
            animate();
        }
    }, [endValue, duration, startOnView]);

    return elementRef;
};
