import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>New Collection 2024</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight animate-slide-up">
              Elevate Your
              <span className="block text-gradient">Lifestyle</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-1">
              Discover our curated collection of premium products designed for those who appreciate the finer things in life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-2">
              <Link
                to="/products"
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/products?category=New"
                className="px-8 py-4 glass rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-muted/50 transition-all duration-300"
              >
                New Arrivals
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-fade-in stagger-3">
              <div>
                <p className="text-3xl font-display font-bold text-gradient">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-gradient">1000+</p>
                <p className="text-sm text-muted-foreground">Premium Products</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-gradient">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative h-[500px] lg:h-[600px] animate-fade-in stagger-2">
            {/* Main Product Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-strong hover-lift z-20">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                alt="Featured Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Images */}
            <div className="absolute top-8 left-0 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-medium hover-lift animate-float z-10">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-8 right-0 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-medium hover-lift animate-float z-10" style={{ animationDelay: '1s' }}>
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-0 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-pulse-soft" />
            <div className="absolute bottom-1/3 left-0 w-16 h-16 rounded-full bg-primary/30 blur-xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
