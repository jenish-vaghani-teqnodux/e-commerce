import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Promo */}
          <div className="relative rounded-3xl overflow-hidden min-h-[500px] group">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="Premium Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4">
                Limited Edition
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-background mb-4">
                The Premium<br />Collection
              </h3>
              <p className="text-background/80 mb-6 max-w-md">
                Discover exclusive pieces crafted for those who demand excellence in every detail.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium w-fit group-hover:shadow-glow transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Secondary Promos */}
          <div className="grid gap-8">
            {/* Sale Banner */}
            <div className="relative rounded-3xl overflow-hidden min-h-[240px] group bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="absolute inset-0 flex items-center p-8 md:p-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-primary font-medium">Season Sale</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    Up to <span className="text-gradient">40% Off</span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Don't miss our biggest sale of the year
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                  >
                    Explore Sale
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Sale"
                    className="w-40 h-40 object-cover rounded-2xl shadow-medium"
                  />
                </div>
              </div>
            </div>

            {/* New Arrivals */}
            <div className="relative rounded-3xl overflow-hidden min-h-[240px] group">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="New Arrivals"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center p-8 md:p-12">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                    Just Arrived
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-2">
                    New Arrivals
                  </h3>
                  <p className="text-background/80 mb-4">
                    Fresh styles just dropped
                  </p>
                  <Link
                    to="/products?category=New"
                    className="inline-flex items-center gap-2 text-background font-medium hover:gap-3 transition-all duration-300"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
