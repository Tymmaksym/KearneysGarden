import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { WorkshopCard } from '@/components/WorkshopCard';
import { getBestsellers } from '@/data/products';
import { getUpcomingWorkshops } from '@/data/workshops';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

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
    });

    return () => ctx.revert();
  }, []);

  const bestsellers = getBestsellers().slice(0, 4);
  const upcomingWorkshops = getUpcomingWorkshops().slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero_garden_wall.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pt-32 pb-20">
          <div className="hero-content max-w-2xl text-white">
            <p className="text-label tracking-wide text-[#E6E2D6] mb-4 text-sm font-semibold uppercase">Welcome to The Old Forge</p>
            <h1 className="font-serif text-white mb-6 text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight">
              Fresh flowers,<br />
              wild & wonderful.
            </h1>
            <p className="text-lg sm:text-xl text-[#E6E2D6] mb-8 max-w-lg leading-relaxed font-light">
              Small-batch bouquets and seasonal planters, crafted with love in our historic Roscommon studio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/bouquets" className="btn-primary border-none bg-cream text-charcoal hover:bg-white text-lg px-8 py-3.5">
                Shop Bouquets
              </Link>
              <Link to="/workshops" className="btn-secondary border-cream text-white hover:bg-cream hover:text-charcoal text-lg px-8 py-3.5">
                Join a Workshop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Floral Creations */}
      <section className="fade-in-section py-16 lg:py-24 bg-cream">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-charcoal">Explore Our Flora</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Seasonal Bouquets */}
            <div className="bg-white rounded-[4px] overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/wild_meadow_basket.jpg"
                  alt="Seasonal Bouquets"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-charcoal mb-3">Seasonal Bouquets</h3>
                <p className="text-sm text-warmgray leading-relaxed mb-4">
                  Hand-tied bouquets featuring the best blooms of the week. Perfect for gifting or bringing nature home.
                </p>
                <Link
                  to="/bouquets"
                  className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-charcoal/20 pb-0.5 hover:border-charcoal transition-colors"
                >
                  Shop Bouquets
                </Link>
              </div>
            </div>

            {/* Funeral Flowers */}
            <div className="bg-white rounded-[4px] overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/funeral/funeral_sheaf.jpg"
                  alt="Funeral Flowers"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-charcoal mb-3">Funeral Flowers</h3>
                <p className="text-sm text-warmgray leading-relaxed mb-4">
                  Thoughtful tributes and sympathy arrangements, handcrafted with care and respect.
                </p>
                <Link
                  to="/funeral-flowers"
                  className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-charcoal/20 pb-0.5 hover:border-charcoal transition-colors"
                >
                  View Tributes
                </Link>
              </div>
            </div>

            {/* Weddings */}
            <div className="bg-white rounded-[4px] overflow-hidden group shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/wedding_arch.jpg"
                  alt="Weddings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-charcoal mb-3">Weddings</h3>
                <p className="text-sm text-warmgray leading-relaxed mb-4">
                  From intimate ceremonies to grand celebrations, we create wild and romantic floral designs.
                </p>
                <Link
                  to="/weddings"
                  className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-charcoal/20 pb-0.5 hover:border-charcoal transition-colors"
                >
                  View Weddings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Family Passion for Flowers */}
      <section className="fade-in-section py-16 lg:py-24">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[4px] overflow-hidden order-2 lg:order-1">
              <img
                src="/images/home_showcase/studio_interior_corner.jpg"
                alt="Cozy corner at Kearney's Gardens studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-label text-dusty mb-3">About Us</p>
              <h2 className="font-serif text-charcoal mb-6">
                Rooted in Roscommon
              </h2>
              <p className="text-warmgray leading-relaxed mb-4">
                Kearney's Gardens isn't just a shop; it's a creative space housed in an old forge. We believe in letting flowers look like flowers — wild, natural, and full of life.
              </p>
              <p className="text-warmgray leading-relaxed mb-8">
                Whether you're picking up a Friday treat, planning a wedding, or getting your hands dirty in a workshop, we promise a warm welcome and expert advice.
              </p>
              <Link to="/about" className="btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="fade-in-section py-20 lg:py-28 bg-cream">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Fast Local Delivery</h3>
              <p className="text-warmgray">Reliable delivery service across Roscommon and nearby counties.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Handcrafted Floral Designs</h3>
              <p className="text-warmgray">Every bouquet and planter is created by hand with care and attention.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Custom Orders Available</h3>
              <p className="text-warmgray">Tailored floral creations made just for your special occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit The Old Forge */}
      <section className="fade-in-section py-16 lg:py-24 bg-cream/50">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-charcoal mb-4">Visit The Old Forge</h2>
            <p className="text-warmgray max-w-xl mx-auto leading-relaxed">
              Our studio is open for browsing, chatting, and smelling the flowers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 h-[400px]">
            <div className="md:col-span-2 h-full rounded-[4px] overflow-hidden relative group">
              <img
                src="/images/home_showcase/storefront.jpg"
                alt="Storefront"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <span className="text-white font-serif text-lg">Main Street Entrance</span>
              </div>
            </div>
            <div className="h-full rounded-[4px] overflow-hidden relative group">
              <img
                src="/images/home_showcase/living_wall.jpg"
                alt="Garden"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-charcoal hover:text-dusty transition-colors"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Bestsellers - Simplified Layout */}
      <section className="fade-in-section py-16 lg:py-24">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-label text-dusty mb-2">Shop Favourites</p>
              <h2 className="font-serif text-charcoal">Most Loved</h2>
            </div>
            <Link to="/bouquets" className="inline-flex items-center gap-2 text-charcoal hover:text-dusty transition-colors text-sm font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="fade-in-section py-20 lg:py-28 bg-cream">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-label text-dusty mb-4">Learn with Us</p>
              <h2 className="font-serif text-charcoal mb-6">
                Join a Workshop
              </h2>
              <p className="text-warmgray leading-relaxed mb-8">
                Learn to arrange flowers with the seasons. Small groups, all materials included, and plenty of tea. Beginners welcome!
              </p>
              <div className="space-y-4 mb-8">
                {upcomingWorkshops.map((workshop) => (
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    variant="compact"
                  />
                ))}
              </div>
              <Link to="/workshops" className="btn-secondary">
                View All Workshops
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-[10px] overflow-hidden">
              <img
                src="/images/workshop_table.jpeg"
                alt="Flower workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Simplified */}
      <section className="fade-in-section py-16 lg:py-24 bg-forest text-cream">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-serif text-cream mb-4">Kind Words</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed font-serif italic mb-8">
              "{testimonials[0].text}"
            </p>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">
              — {testimonials[0].name}, {testimonials[0].location}
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramSection />
    </div>
  );
}

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Roscommon',
    rating: 5,
    text: 'The most beautiful bouquet I have ever received! The flowers lasted for over two weeks and the arrangement was absolutely stunning. Kearney\'s Gardens truly understands the art of floristry.',
    image: '/images/testimonial_1.jpg',
  },
  {
    id: 2,
    name: 'Michael & Emma',
    location: 'Athlone',
    rating: 5,
    text: 'We ordered our wedding flowers from Kearney\'s Gardens and they exceeded all our expectations. The attention to detail and personal touch made our day even more special.',
    image: '/images/testimonial_2.jpg',
  },
  {
    id: 3,
    name: 'Patricia K.',
    location: 'Castlerea',
    rating: 5,
    text: 'I attended the Spring Arrangement workshop and it was such a wonderful experience. Mary is a fantastic teacher and I left with a beautiful creation and new skills.',
    image: '/images/testimonial_3.jpg',
  },
  {
    id: 4,
    name: 'David R.',
    location: 'Ballinasloe',
    rating: 5,
    text: 'The seasonal planters for our restaurant entrance have transformed the space. Our customers always comment on how beautiful they look. Highly recommend their custom service!',
    image: '/images/testimonial_4.jpg',
  },
];

// Instagram feed data
const instagramPosts = [
  { id: 1, image: '/images/insta_1.jpg', likes: 124 },
  { id: 2, image: '/images/insta_2.jpg', likes: 89 },
  { id: 3, image: '/images/insta_3.jpg', likes: 156 },
  { id: 4, image: '/images/insta_4.jpg', likes: 201 },
  { id: 5, image: '/images/insta_5.jpg', likes: 167 },
  { id: 6, image: '/images/insta_6.jpg', likes: 93 },
];




// Instagram Section Component
function InstagramSection() {
  return (
    <section className="fade-in-section py-20 lg:py-28">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-dusty" />
            <span className="text-label text-dusty">@kearneysgardens</span>
          </div>
          <h2 className="font-serif text-charcoal mb-4">Follow Our Journey</h2>
          <p className="text-warmgray max-w-xl mx-auto">
            Get a glimpse behind the scenes at Kearney's Gardens — from daily arrangements to workshop moments and seasonal blooms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/kearneysgardens"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[10px] overflow-hidden"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-forest/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-cream text-center">
                  <Instagram className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">{post.likes} likes</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/kearneysgardens"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-charcoal hover:text-dusty transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow us on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
