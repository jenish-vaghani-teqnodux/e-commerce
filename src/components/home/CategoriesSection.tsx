import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Shirt, Watch, Sparkles, Home } from 'lucide-react';

const categories = [
  { 
    name: 'Electronics', 
    icon: Monitor, 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    count: '120+ Products'
  },
  { 
    name: 'Fashion', 
    icon: Shirt, 
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    count: '200+ Products'
  },
  { 
    name: 'Accessories', 
    icon: Watch, 
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    count: '80+ Products'
  },
  { 
    name: 'Beauty', 
    icon: Sparkles, 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    count: '150+ Products'
  },
  { 
    name: 'Home', 
    icon: Home, 
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    count: '90+ Products'
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Browse by Category
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Shop by <span className="text-gradient">Category</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-3 p-3 rounded-xl bg-background/10 backdrop-blur-sm w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-background mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-background/70">{category.count}</p>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
