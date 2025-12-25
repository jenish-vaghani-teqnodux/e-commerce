import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, ChevronDown, X, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import productsData from '@/data/products.json';

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Beauty', 'Home'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $300', min: 100, max: 300 },
  { label: '$300 - $500', min: 300, max: 500 },
  { label: 'Over $500', min: 500, max: Infinity },
];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const activeCategory = searchParams.get('category') || 'All';
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const filteredProducts = useMemo(() => {
    let products = [...productsData.products];

    // Filter by category
    if (activeCategory !== 'All') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by price
    products = products.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filter by rating
    if (minRating > 0) {
      products = products.filter(p => p.rating >= minRating);
    }

    // Sort
    switch (sortBy.value) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return products;
  }, [activeCategory, priceRange, minRating, sortBy]);

  const setCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    searchParams.delete('category');
    setSearchParams(searchParams);
    setPriceRange(priceRanges[0]);
    setMinRating(0);
    setSortBy(sortOptions[0]);
  };

  const hasActiveFilters = activeCategory !== 'All' || priceRange !== priceRanges[0] || minRating > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-32 glass rounded-2xl p-6 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setCategory(category)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          activeCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(range)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          priceRange === range
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[0, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all duration-200 ${
                          minRating === rating
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {rating === 0 ? (
                          'All Ratings'
                        ) : (
                          <>
                            <Star className="w-4 h-4 fill-current" />
                            {rating}+ Stars
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-4 ml-auto">
                  {/* Sort */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium">
                      {sortBy.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 glass rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-strong">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === option
                              ? 'text-primary bg-primary/5'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-background shadow-sm' : ''
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-background shadow-sm' : ''
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                      {activeCategory}
                      <button onClick={() => setCategory('All')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {priceRange !== priceRanges[0] && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                      {priceRange.label}
                      <button onClick={() => setPriceRange(priceRanges[0])}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {minRating > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                      {minRating}+ Stars
                      <button onClick={() => setMinRating(0)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="text-primary font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
