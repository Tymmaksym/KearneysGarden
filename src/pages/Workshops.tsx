import { useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkshopCard } from '@/components/WorkshopCard';
import { getUpcomingWorkshops } from '@/data/workshops';

gsap.registerPlugin(ScrollTrigger);



export function Workshops() {
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

  const upcomingWorkshops = useMemo(() => {
    return getUpcomingWorkshops();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/workshops/garden_aerial.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4 tracking-wider">Create · Connect · Unwind</p>
            <h1 className="font-serif text-cream text-5xl md:text-7xl mb-6">Garden Workshops</h1>
            <p className="text-lg md:text-xl text-cream/90 leading-relaxed max-w-2xl">
              Escape to the garden for a hands-on creative experience.
              Designed for intimate groups and nature lovers.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Story */}
      <section className="fade-in-section py-20 lg:py-28 bg-white">
        <div className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-charcoal text-3xl md:text-4xl mb-6">Welcome to My Garden</h2>
          <p className="text-warmgray text-lg leading-relaxed mb-8">
            "I've always believed that the best way to learn about flowers is to be among them.
            Our workshops are held right here in the heart of the garden, where you can see, smell,
            and touch the seasons as they change. It's not just about arranging flowers;
            it's about slowing down, having a cup of tea, and creating something with your own hands."
          </p>
          <p className="font-serif text-charcoal text-xl italic">— Tommy Kearney</p>
        </div>
      </section>

      {/* Atmosphere Grid */}
      <section className="fade-in-section pb-20 lg:pb-28 bg-white">
        <div className="px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-[50vh] md:h-[60vh]">
            <div className="col-span-1 h-full rounded-lg overflow-hidden">
              <img src="/images/workshops/workshop_action_1.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Creating" />
            </div>
            <div className="col-span-1 h-full rounded-lg overflow-hidden md:col-span-2">
              <img src="/images/workshops/workshop_group.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Group workshop" />
            </div>
            <div className="col-span-1 h-full rounded-lg overflow-hidden hidden md:block">
              <img src="/images/workshops/workshop_detail.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Details" />
            </div>
            <div className="col-span-1 h-full rounded-lg overflow-hidden md:hidden">
              <img src="/images/workshops/garden_path.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Garden path" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Workshops */}
      <div id="workshops-list" className="py-16 lg:py-24 bg-cream">
        <div className="px-4 sm:px-6 lg:px-12">

          <div className="text-center mb-12">
            <h2 className="font-serif text-charcoal">Upcoming Sessions</h2>
            <p className="text-warmgray mt-2">Join us for an upcoming seasonal workshop.</p>
          </div>

          {/* Workshop Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>

          {upcomingWorkshops.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[10px] shadow-sm">
              <p className="font-serif text-xl text-charcoal mb-2">No workshops found</p>
            </div>
          )}
        </div>
      </div>

      {/* Private Groups CTA */}
      <section className="fade-in-section py-24 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/workshops/garden_path.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 text-center max-w-3xl mx-auto">
          <Users className="w-12 h-12 text-dusty mx-auto mb-6" />
          <h2 className="font-serif text-cream mb-4">Gather Your Flock</h2>
          <p className="text-cream/80 text-lg mb-8 leading-relaxed">
            Planning a hen party, team building day, or just a get-together?
            We host private groups for bespoke workshops in the garden.
            Bring your own wine, we'll provide the flowers and the fun.
          </p>
          <Link to="/contact" className="btn-primary bg-dusty text-charcoal border-none hover:bg-cream">
            Enquire About Private Events
          </Link>
        </div>
      </section>

    </div>
  );
}
