import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero.jpg';

const HeroSection: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const fadeEnd = 600;
      setOpacity(Math.max(0, 1 - window.scrollY / fadeEnd));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Fixed background with animation */}
      <div className="fixed inset-0 -z-10" style={{ opacity }}>
        <div className="absolute inset-0 animate-hero-zoom">
          <img
            src={heroImage}
            alt="Premium gift boxes"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </div>
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 animate-hero-shimmer bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/80" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-4 leading-tight animate-fade-in-up">
          Gifts Wrapped<br />
          <span className="text-gold">With Love</span>
        </h1>
        <p className="text-card/80 text-base md:text-lg max-w-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Premium curated gift boxes for birthdays, celebrations, and every moment worth remembering.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gold text-primary-foreground font-semibold px-8 py-3 rounded-full hover:bg-gold-dark transition-colors animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Shop Now
        </Link>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-card/60" size={28} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
