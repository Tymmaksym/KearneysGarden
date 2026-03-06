import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Flower2, Truck, Sparkles, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export function Bouquets() {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bouquetProducts = useMemo(() => {
    return products.filter(p => p.category === 'bouquet');
  }, []);

  const visibleProducts = useMemo(() => {
    let sorted = [...bouquetProducts];

    // Sort
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return b.rating - a.rating;
        });
    }

    return sorted;
  }, [bouquetProducts, sortBy]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/collection_bouquets.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Bouquets</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">Handcrafted with Love</p>
            <h1 className="font-serif text-cream mb-6">Fresh Bouquets</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              Hand-tied bouquets made with seasonal blooms, sourced fresh each morning from local growers.
              Each arrangement is unique and crafted with care in our Cloonfad studio.
            </p>
          </div>
        </div>
      </section>



      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">

          {/* Sort Bar (No Filters) */}
          <div className="fade-in-section flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-charcoal/10">
            <div className="flex items-center gap-4">
              {/* No Filter Button here */}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-warmgray">
                {visibleProducts.length} {visibleProducts.length === 1 ? 'bouquet' : 'bouquets'}
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2 pr-10 bg-white rounded-full text-sm font-medium cursor-pointer hover:bg-dusty/20 transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* No Sidebar */}

            {/* Product Grid */}
            <div className="flex-1">
              {visibleProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[10px]">
                  <div className="w-16 h-16 rounded-full bg-dusty/20 flex items-center justify-center mx-auto mb-4">
                    <Flower2 className="w-8 h-8 text-dusty" />
                  </div>
                  <p className="font-serif text-xl text-charcoal mb-2">No bouquets found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Order CTA */}
      <section className="fade-in-section py-20 lg:py-28 bg-forest">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-dusty mx-auto mb-6" />
            <h2 className="font-serif text-cream mb-4">Looking for Something Special?</h2>
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              We create custom bouquets for weddings, events, and special occasions.
              Share your vision with us and we'll bring it to life with seasonal blooms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-cream text-forest hover:bg-cream/90">
                Request Custom Order
              </Link>
              <Link to="/wedding-flowers" className="btn-secondary border-cream/30 text-cream hover:bg-cream/10">
                Wedding Flowers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="fade-in-section py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src="/images/line_delivery.jpg"
                alt="Flower delivery box illustration"
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div>
              <p className="text-label text-dusty mb-4">Delivery Information</p>
              <h2 className="font-serif text-charcoal mb-6">Fresh Flowers, Delivered with Care</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Local Delivery</h4>
                    <p className="text-warmgray text-sm">Same-day delivery available across Roscommon and surrounding areas for orders placed before 2pm.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Carefully Packaged</h4>
                    <p className="text-warmgray text-sm">Each bouquet is hand-wrapped in eco-friendly packaging to ensure it arrives in perfect condition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Freshness Guaranteed</h4>
                    <p className="text-warmgray text-sm">We source our flowers daily from local growers. If you're not happy, we'll make it right.</p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 mt-8 text-forest font-medium hover:underline">
                Learn more about delivery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
