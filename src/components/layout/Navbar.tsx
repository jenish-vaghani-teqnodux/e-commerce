import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';

const categories = [
  { name: 'Electronics', href: '/products?category=Electronics' },
  { name: 'Fashion', href: '/products?category=Fashion' },
  { name: 'Accessories', href: '/products?category=Accessories' },
  { name: 'Beauty', href: '/products?category=Beauty' },
  { name: 'Home', href: '/products?category=Home' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass shadow-medium py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
              <span className="text-primary-foreground font-display font-bold text-xl">L</span>
            </div>
            <span className="font-display text-2xl font-semibold text-foreground hidden sm:block">
              Luxora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                isCategoryOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="glass rounded-xl p-4 min-w-[200px] shadow-strong">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/products" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              All Products
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              {isSearchOpen ? (
                <div className="flex items-center glass rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none"
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-full transition-all duration-300 hover:rotate-180"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to="/login" className="hidden sm:flex p-2 hover:bg-muted rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <div className="glass rounded-xl p-4 space-y-2">
            <Link to="/" className="block px-4 py-3 text-sm font-medium hover:bg-primary/5 rounded-lg transition-colors">
              Home
            </Link>
            <Link to="/products" className="block px-4 py-3 text-sm font-medium hover:bg-primary/5 rounded-lg transition-colors">
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link to="/login" className="block px-4 py-3 text-sm font-medium hover:bg-primary/5 rounded-lg transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
