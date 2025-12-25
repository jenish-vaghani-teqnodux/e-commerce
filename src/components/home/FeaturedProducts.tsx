import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import productsData from '@/data/products.json';

const tabs = ['All', 'Electronics', 'Fashion', 'Accessories'];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const filteredProducts = activeTab === 'All' 
    ? productsData.products.slice(0, 8)
    : productsData.products.filter(p => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Curated for You
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Collection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked products that define excellence. Each item is carefully selected to ensure the highest quality and style.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
