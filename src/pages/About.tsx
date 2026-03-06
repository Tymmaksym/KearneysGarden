import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Leaf, MapPin, Phone, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
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

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/about/hero_bg.jpg)' }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">Our Story</p>
            <h1 className="font-serif text-cream mb-6">Kearney's Gardens</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              A family-run flower shop and garden centre in the heart of Cloonfad,
              where passion for plants meets warm Irish hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="fade-in-section py-8 bg-white border-b border-charcoal/10">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Family Run</p>
                <p className="text-warmgray text-xs">Since 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Locally Grown</p>
                <p className="text-warmgray text-xs">Fresh & seasonal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Community</p>
                <p className="text-warmgray text-xs">A place to gather</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Cloonfad</p>
                <p className="text-warmgray text-xs">Co. Roscommon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">
          {/* Story Section 1 */}
          <section className="fade-in-section grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center font-serif text-xl text-forest">1</span>
                <h2 className="font-serif text-charcoal">Humble Beginnings</h2>
              </div>
              <p className="text-warmgray leading-relaxed mb-4">
                Kearney's Gardens began at the Christmas markets, where I first started selling outdoor Christmas planters and a few houseplants, all made from my little 8' by 12' wooden shed. Gardening has always been a passion of mine, and I'd long dreamed of opening a garden shop of my own.
              </p>
              <p className="text-warmgray leading-relaxed">
                In February 2023, we bought the premises with plans to open that summer. But after making a few spring and Mother's Day planters, demand quickly grew, and I officially opened the doors on April 1st. For the first year, I balanced the shop with a full-time job, so Kearney's Gardens opened evenings and weekends only. In June 2024, I was finally able to commit full-time — and that's when things really took off.
              </p>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src="/images/about/shop_interior.jpg"
                alt="Kearney's Gardens shop interior"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Story Section 2 */}
          <section className="fade-in-section grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src="/images/about/family_team.jpg"
                alt="The Kearney family"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center font-serif text-xl text-forest">2</span>
                <h2 className="font-serif text-charcoal">A Family Affair</h2>
              </div>
              <p className="text-warmgray leading-relaxed mb-4">
                Kearney's Gardens is very much a family-run space. My wife Karen works mostly behind the scenes (keeping me organised — no small task!) and often helps out in the shop. Our son Reece, who's 12, is already part of the team, helping with the garden centre and serving customers. And on Saturdays, you'll likely meet Micheal, our weekend staff member.
              </p>
            </div>
          </section>

          {/* Story Section 3 */}
          <section className="fade-in-section grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center font-serif text-xl text-forest">3</span>
                <h2 className="font-serif text-charcoal">A Little Haven</h2>
              </div>
              <p className="text-warmgray leading-relaxed mb-4">
                We want Kearney's Gardens to feel calm and welcoming — a place where people can pause, relax, and have a chat over a coffee. The shop is full of character, with an eclectic, natural style that reflects my love for both plants and people.
              </p>
              <p className="text-warmgray leading-relaxed mb-4">
                Since June 2024, we've added fresh flowers to the mix — and I absolutely love this part of the business. We create on-demand bouquets, funeral flowers, and arrangements for weddings and events. We also stock a changing range of seasonal outdoor plants, locally made crafts, thoughtful gifts, and sweet treats.
              </p>
              <p className="text-warmgray leading-relaxed">
                We also run occasional workshops in the forge — from seasonal planters to creative floral arrangements — and I'm always happy to travel to run workshops for local groups, clubs, or community events.
              </p>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src="/images/about/workshop_detail.jpg"
                alt="Workshop at Kearney's Gardens"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Our Promise */}
          <section className="fade-in-section bg-forest rounded-[10px] p-8 lg:p-16 mb-20 lg:mb-28">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-12 h-12 text-dusty mx-auto mb-6" />
              <h2 className="font-serif text-cream text-3xl lg:text-4xl mb-6">
                Our Promise
              </h2>
              <p className="font-serif text-xl lg:text-2xl text-cream italic mb-8">
                "From our garden to your home — made with care, delivered with heart."
              </p>
              <p className="text-cream/70">
                Whether you need planting advice, a unique gift, or just a quiet moment to yourself,
                I hope Kearney's Gardens is a place where you feel welcome. More than anything,
                I want it to be a little haven in our community — somewhere to meet, unwind, and enjoy a slower pace.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <section className="fade-in-section mb-20 lg:mb-28">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-cream">
                <img
                  src="/images/line_about.jpg"
                  alt="About illustration"
                  className="w-full h-full object-contain p-8"
                />
              </div>
              <div>
                <p className="text-label text-dusty mb-4">Get in Touch</p>
                <h2 className="font-serif text-charcoal mb-6">Visit Us</h2>
                <p className="text-warmgray leading-relaxed mb-8">
                  We'd love to see you at the shop. Stop by for a chat, a coffee,
                  or just to browse our latest blooms and plants.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">Address</p>
                      <p className="text-warmgray text-sm">Main Street, Cloonfad East<br />Cloonfad, Co. Roscommon<br />F35 H697, Ireland</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">Phone</p>
                      <a href="tel:+353871234567" className="text-warmgray text-sm hover:text-forest transition-colors">+353 87 123 4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">Email</p>
                      <a href="mailto:hello@kearneysgardens.ie" className="text-warmgray text-sm hover:text-forest transition-colors">hello@kearneysgardens.ie</a>
                    </div>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 mt-8 text-forest font-medium hover:underline">
                  View full contact details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
