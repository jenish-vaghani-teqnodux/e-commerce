import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviews: number;
  badge?: string | null;
  inStock?: boolean;
}

const ProductCard = ({ 
  id, name, brand, price, originalPrice, image, rating, reviews, badge, inStock = true 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, name, price, image });
  };

  return (
    <Link 
      to={`/product/${id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-card rounded-2xl overflow-hidden hover-lift border border-border/50 hover:border-primary/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-foreground/5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* Badge */}
          {badge && (
            <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-glow">
              {badge}
            </span>
          )}

          {/* Discount Badge */}
          {discount && (
            <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
              -{discount}%
            </span>
          )}

          {/* Quick Actions */}
          <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                inStock 
                  ? 'bg-primary text-primary-foreground hover:shadow-glow' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {inStock ? 'Add to Cart' : 'Sold Out'}
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/product/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-xl bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{brand}</p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
