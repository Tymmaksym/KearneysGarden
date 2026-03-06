import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ArrowRight, Leaf, Sun, Droplets, Heart, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export function Planters() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPotTypes, setSelectedPotTypes] = useState<string[]>([]);
  const [selectedPlantTypes, setSelectedPlantTypes] = useState<string[]>([]);
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

  const planterProducts = useMemo(() => {
    return products.filter(p => p.category === 'planter');
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...planterProducts];

    // Filter by Pot Type
    if (selectedPotTypes.length > 0) {
      filtered = filtered.filter(p => p.potType && selectedPotTypes.includes(p.potType));
    }

    // Filter by Plant Type
    if (selectedPlantTypes.length > 0) {
      filtered = filtered.filter(p => p.plantType && selectedPlantTypes.includes(p.plantType));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [planterProducts, selectedPotTypes, selectedPlantTypes, sortBy]);

  const clearFilters = () => {
    setSelectedPotTypes([]);
    setSelectedPlantTypes([]);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedPotTypes.length > 0 || selectedPlantTypes.length > 0;

  const toggleFilter = (current: string[], setFn: (val: string[]) => void, value: string) => {
    if (current.includes(value)) {
      setFn(current.filter(item => item !== value));
    } else {
      setFn([...current, value]);
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/planter_terrarium.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Seasonal Planters</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">Bring Nature Home</p>
            <h1 className="font-serif text-cream mb-6">Seasonal Planters</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              Beautiful potted plants and terrariums that bring life to any space.
              Each plant is carefully selected and comes with care instructions to help it thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}


      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">

          {/* Filters & Sort Bar */}
          <div className="fade-in-section flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-charcoal/10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium hover:bg-dusty/20 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-dusty text-charcoal text-xs rounded-full flex items-center justify-center">
                    {selectedPotTypes.length + selectedPlantTypes.length}
                  </span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-warmgray hover:text-charcoal transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-warmgray">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'plant' : 'plants'}
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
            {/* Sidebar Filters */}
            {showFilters && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="space-y-8 sticky top-28">

                  {/* Pot Type */}
                  <div className="bg-white rounded-[10px] p-6">
                    <h4 className="font-medium text-charcoal mb-4">Pot Type</h4>
                    <div className="space-y-3">
                      {['Ceramic', 'Metal'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedPotTypes.includes(type)}
                            onChange={() => toggleFilter(selectedPotTypes, setSelectedPotTypes, type)}
                            className="w-4 h-4 rounded border-charcoal/30 text-forest focus:ring-forest"
                          />
                          <span className="text-sm text-warmgray group-hover:text-charcoal transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Plant Type */}
                  <div className="bg-white rounded-[10px] p-6">
                    <h4 className="font-medium text-charcoal mb-4">Plant Type</h4>
                    <div className="space-y-3">
                      {['Outdoor', 'Indoor'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedPlantTypes.includes(type)}
                            onChange={() => toggleFilter(selectedPlantTypes, setSelectedPlantTypes, type)}
                            className="w-4 h-4 rounded border-charcoal/30 text-forest focus:ring-forest"
                          />
                          <span className="text-sm text-warmgray group-hover:text-charcoal transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white rounded-[10px] p-6">
                    <h4 className="font-medium text-charcoal mb-4">Need Help?</h4>
                    <Link to="/contact" className="flex items-center gap-2 text-sm text-warmgray hover:text-forest transition-colors mb-3">
                      <Phone className="w-4 h-4" />
                      Contact us for advice
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-80 bg-cream p-6 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-xl">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium text-charcoal mb-4">Pot Type</h4>
                      <div className="space-y-3">
                        {['Ceramic', 'Metal'].map((type) => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPotTypes.includes(type)}
                              onChange={() => toggleFilter(selectedPotTypes, setSelectedPotTypes, type)}
                              className="w-4 h-4 rounded border-charcoal/30 text-forest focus:ring-forest"
                            />
                            <span className="text-sm text-warmgray">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-charcoal mb-4">Plant Type</h4>
                      <div className="space-y-3">
                        {['Outdoor', 'Indoor'].map((type) => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPlantTypes.includes(type)}
                              onChange={() => toggleFilter(selectedPlantTypes, setSelectedPlantTypes, type)}
                              className="w-4 h-4 rounded border-charcoal/30 text-forest focus:ring-forest"
                            />
                            <span className="text-sm text-warmgray">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="btn-primary w-full mt-8"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[10px]">
                  <div className="w-16 h-16 rounded-full bg-dusty/20 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-dusty" />
                  </div>
                  <p className="font-serif text-xl text-charcoal mb-2">No plants found</p>
                  <p className="text-warmgray mb-6">Try adjusting your filters or browse all plants</p>
                  <button onClick={clearFilters} className="btn-secondary">
                    View All Plants
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Planters CTA */}
      <section className="fade-in-section py-20 lg:py-28 bg-forest">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <Leaf className="w-12 h-12 text-dusty mx-auto mb-6" />
            <h2 className="font-serif text-cream mb-4">Custom Planter Service</h2>
            <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
              Brighten up your home or business all year round with our custom planter service.
              Bring your own containers and we'll create beautiful seasonal displays.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-cream text-forest hover:bg-cream/90">
                Enquire Now
              </Link>
              <Link to="/workshops" className="btn-secondary border-cream/30 text-cream hover:bg-cream/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Care Guide */}
      <section className="fade-in-section py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-cream">
              <img
                src="/images/line_plant_care.jpg"
                alt="Plant care illustration"
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div>
              <p className="text-label text-dusty mb-4">Plant Care Guide</p>
              <h2 className="font-serif text-charcoal mb-6">Helping Your Plants Thrive</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Sun className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Light Requirements</h4>
                    <p className="text-warmgray text-sm">Every plant comes with specific light recommendations. We label each plant with its ideal conditions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Watering Guide</h4>
                    <p className="text-warmgray text-sm">Overwatering is the #1 killer of houseplants. We provide clear watering schedules for each plant.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">Custom Orders</h4>
                    <p className="text-warmgray text-sm">Tailored floral creations made just for your special occasion. Contact us to discuss your needs.</p>
                  </div>
                </div>
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 mt-8 text-forest font-medium hover:underline">
                Read our plant care blog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
