import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-[10px] mb-4 aspect-[4/5] bg-cream">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-forest text-cream text-xs font-medium rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-3 py-1 bg-dusty text-charcoal text-xs font-medium rounded-full">
              Bestseller
            </span>
          )}
          {!product.inStock && (
            <span className="px-3 py-1 bg-charcoal/80 text-cream text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {showQuickAdd && product.inStock && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="flex-1 bg-white text-charcoal py-2.5 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-dusty transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isWishlisted
                ? 'bg-dusty text-charcoal'
                : 'bg-white text-charcoal hover:bg-dusty'
                }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start mt-4 gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-charcoal group-hover:text-dusty transition-colors leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-dusty text-dusty" />
              <span className="text-sm text-warmgray">{product.rating}</span>
            </div>
            <span className="text-warmgray/50">•</span>
            <span className="text-sm text-warmgray">({product.reviewCount})</span>
          </div>
        </div>
        <p className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#9A6A4D] font-medium whitespace-nowrap mt-[-4px]">
          €{product.price}
          {product.sizes && product.sizes.length > 0 && (
            <span className="text-base text-[#9A6A4D]/80 font-normal ml-1">+</span>
          )}
        </p>
      </div>
    </Link>
  );
}
