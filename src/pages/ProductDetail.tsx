import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, Truck, Star, Minus, Plus, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { getProductById, products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16 text-center">
        <p className="font-serif text-2xl text-charcoal mb-4">Product not found</p>
        <Link to="/bouquets" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentPrice = product.sizes?.find(s => s.name === selectedSize)?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast.success(`${product.name} added to bag`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${product.category}s`} className="hover:text-charcoal transition-colors capitalize">
            {product.category}s
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        {/* Back Button (Mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden flex items-center gap-2 text-sm text-warmgray mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-[10px] overflow-hidden bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-dusty' : 'border-transparent'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
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
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-dusty text-dusty' : 'text-warmgray/30'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-warmgray">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="font-serif text-3xl text-charcoal">€{currentPrice}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-warmgray line-through">
                  €{product.originalPrice}
                </span>
              )}

              <div className="mt-2 text-sm font-medium text-dusty">
                Category: <span className="font-normal">{product.categoryLabel || product.category}</span>
              </div>
            </div>

            <p className="text-warmgray mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-label text-charcoal mb-3 block">
                  Size: <span className="font-normal">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${selectedSize === size.name
                        ? 'border-dusty bg-dusty/10 text-charcoal'
                        : 'border-charcoal/20 text-charcoal hover:border-dusty'
                        }`}
                    >
                      {size.name} (€{size.price})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-label text-charcoal mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-charcoal/20 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream rounded-l-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-cream rounded-r-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {!product.inStock && (
                  <span className="text-red-500 text-sm">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Bag' : 'Out of Stock'}
              </button>
              <button
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${isWishlisted
                  ? 'border-dusty bg-dusty text-charcoal'
                  : 'border-charcoal/20 text-charcoal hover:border-dusty'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="w-14 h-14 rounded-full border-2 border-charcoal/20 text-charcoal hover:border-dusty flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-5 py-6 border-t border-charcoal/10">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-dusty flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-charcoal">Fast Local Delivery</span>
                  <p className="text-sm text-warmgray">Reliable delivery service across Roscommon and nearby counties.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-dusty flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-charcoal">Handcrafted Floral Designs</span>
                  <p className="text-sm text-warmgray">Every bouquet and planter is created by hand with care and attention.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-dusty flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-charcoal">Custom Orders Available</span>
                  <p className="text-sm text-warmgray">Tailored floral creations made just for your special occasion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-charcoal/10 rounded-none bg-transparent h-auto p-0 mb-6">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-dusty data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-dusty data-[state=active]:bg-transparent px-6 py-3"
              >
                Details
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-dusty data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="max-w-3xl">
                <p className="text-warmgray leading-relaxed">
                  {product.description}
                </p>
                <p className="text-warmgray leading-relaxed mt-4">
                  Each arrangement is carefully crafted by our skilled florists using the freshest seasonal blooms.
                  We source our flowers from local Irish growers whenever possible, ensuring the highest quality
                  and supporting our community.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <div className="max-w-3xl">
                <ul className="space-y-3">
                  <li className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-warmgray">Category</span>
                    <span className="text-charcoal capitalize">{product.category}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-warmgray">Availability</span>
                    <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
                      {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                    </span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-charcoal/10">
                    <span className="text-warmgray">Tags</span>
                    <span className="text-charcoal">{product.tags.join(', ')}</span>
                  </li>
                </ul>
              </div>
            </TabsContent>



            <TabsContent value="reviews" className="mt-0">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-serif text-charcoal">{product.rating}</div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-dusty text-dusty' : 'text-warmgray/30'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-warmgray">Based on {product.reviewCount} reviews</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { name: "Mary O'Connor", rating: 5, text: "Absolutely stunning! The flowers lasted for over two weeks.", date: "2 weeks ago" },
                    { name: "John Byrne", rating: 5, text: "Perfect gift for my wife. She was delighted!", date: "1 month ago" },
                    { name: "Sarah Kelly", rating: 4, text: "Beautiful arrangement, exactly as pictured.", date: "2 months ago" },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-charcoal/10 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-charcoal">{review.name}</span>
                        <span className="text-sm text-warmgray">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-dusty text-dusty' : 'text-warmgray/30'}`}
                          />
                        ))}
                      </div>
                      <p className="text-warmgray">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
