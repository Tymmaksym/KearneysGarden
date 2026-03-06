import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flower2, Lightbulb, Calendar, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlogCard } from '@/components/BlogCard';
import { blogPosts, categories } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return blogPosts;
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = blogPosts[0];

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/blog/hero_bg.jpg)' }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Journal</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">Stories & Tips</p>
            <h1 className="font-serif text-cream mb-6">The Journal</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              Tips on keeping cut flowers longer, choosing seasonal stems,
              and styling your space with plants.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Banner */}
      <section className="fade-in-section py-8 bg-white border-b border-charcoal/10">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Flower Care</p>
                <p className="text-warmgray text-xs">Keep blooms fresh</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Flower2 className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Seasonal Guide</p>
                <p className="text-warmgray text-xs">What's blooming now</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Styling Tips</p>
                <p className="text-warmgray text-xs">Decorate with flowers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Workshop News</p>
                <p className="text-warmgray text-xs">Behind the scenes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">
          {/* Featured Post */}
          <section className="fade-in-section mb-16">
            <p className="text-label text-dusty mb-4">Featured Story</p>
            <BlogCard post={featuredPost} variant="featured" />
          </section>

          {/* Category Filter */}
          <section className="fade-in-section mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                    ? 'bg-forest text-cream'
                    : 'bg-white text-charcoal hover:bg-dusty/20'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Posts Grid */}
          <section className="fade-in-section">
            <h2 className="font-serif text-charcoal mb-8">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-[10px]">
                <p className="text-warmgray">No articles found in this category.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* About the Journal */}
      <section className="fade-in-section py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-cream">
              <img
                src="/images/line_journal.jpg"
                alt="Journal illustration"
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div>
              <p className="text-label text-dusty mb-4">About the Journal</p>
              <h2 className="font-serif text-charcoal mb-6">From Our Garden to Your Screen</h2>
              <p className="text-warmgray leading-relaxed mb-6">
                Welcome to The Journal — a space where we share our passion for flowers,
                plants, and all things botanical. Here you'll find practical advice,
                seasonal inspiration, and stories from our little flower shop in Cloonfad.
              </p>
              <p className="text-warmgray leading-relaxed mb-8">
                Whether you're a seasoned gardener or just starting your plant journey,
                we hope our stories help you bring a little more nature into your life.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-forest font-medium hover:underline">
                Meet the team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
