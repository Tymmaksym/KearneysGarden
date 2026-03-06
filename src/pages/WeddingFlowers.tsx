import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Minus, Plus, Sparkles, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WeddingItem {
  id: string;
  name: string;
  description: string;
  image: string;
  maxQty: number;
}

const weddingItems: WeddingItem[] = [
  {
    id: 'bridal-bouquet',
    name: 'Bridal Bouquet',
    description: 'Hand-tied bouquet for the bride, crafted with seasonal blooms and elegant foliage.',
    image: '/images/wedding_bridal_bouquet.jpeg',
    maxQty: 5,
  },
  {
    id: 'bridesmaid-bouquets',
    name: 'Bridesmaid Bouquets',
    description: 'Smaller complementary bouquets to match the bridal arrangement and wedding theme.',
    image: '/images/wedding_table_centrepiece.jpeg',
    maxQty: 10,
  },
  {
    id: 'ceremony-arch',
    name: 'Ceremony Arch',
    description: 'Stunning floral arch as the perfect ceremony backdrop for exchanging vows.',
    image: '/images/wedding_arch.jpg',
    maxQty: 2,
  },
  {
    id: 'pew-end-flowers',
    name: 'Pew End Flowers',
    description: 'Delicate arrangements for church pews, adding a romantic touch to the aisle.',
    image: '/images/wedding_pew_end.jpeg',
    maxQty: 20,
  },
  {
    id: 'table-centrepieces',
    name: 'Table Centrepieces',
    description: 'Elegant table arrangements to bring your reception to life with colour and fragrance.',
    image: '/images/wedding_table_centrepiece.jpeg',
    maxQty: 30,
  },
  {
    id: 'altar-arrangements',
    name: 'Altar Arrangements',
    description: 'Statement floral pieces for the altar or ceremony focal point.',
    image: '/images/wedding_altar.jpeg',
    maxQty: 4,
  },
];

const galleryImages = [
  '/images/wedding_arch.jpg',
  '/images/wedding_bridal_bouquet.jpeg',
  '/images/wedding_table_centrepiece.jpeg',
  '/images/wedding_pew_end.jpeg',
  '/images/wedding_altar.jpeg',
];

export function WeddingFlowers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    coupleNames: '',
    email: '',
    phone: '',
    weddingDate: '',
    venueName: '',
    colourTheme: '',
    notes: '',
    agreed: false,
  });

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const updateQty = (itemId: string, delta: number, maxQty: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, Math.min(maxQty, current + delta));
      return { ...prev, [itemId]: next };
    });
  };

  const selectedItems = weddingItems.filter((item) => (quantities[item.id] || 0) > 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + (quantities[item.id] || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      toast.error('Please agree to the Terms and Conditions');
      return;
    }
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item for your wedding set');
      return;
    }
    toast.success('Thank you! We will contact you within 24 hours to discuss your wedding flowers.');
    setFormData({
      coupleNames: '',
      email: '',
      phone: '',
      weddingDate: '',
      venueName: '',
      colourTheme: '',
      notes: '',
      agreed: false,
    });
    setQuantities({});
  };

  const faqs = [
    {
      question: 'Can I customize my wedding flower package?',
      answer: 'Yes! We work closely with every couple to design a floral set that reflects your style and vision. From bouquets to arches and table arrangements — everything can be tailored.',
    },
    {
      question: 'How far in advance should I book wedding flowers?',
      answer: 'We recommend booking at least 1–3 months before your wedding to ensure availability. However, we also do our best to accommodate last-minute requests.',
    },
    {
      question: 'Can you match flowers to my wedding theme or colour palette?',
      answer: 'Yes, we can source flowers that complement your chosen colours and theme. Just share your ideas and we\'ll create designs to match.',
    },
    {
      question: 'Do you also provide flowers for the groom, bridesmaids, and guests?',
      answer: 'Of course. We offer boutonnieres, bridesmaid bouquets, flower crowns, and even small thank-you gifts for guests if needed.',
    },
    {
      question: 'What happens if a flower I request is out of season?',
      answer: 'If a specific flower isn\'t available, we\'ll suggest the closest alternative that matches your colour and style, ensuring your design stays beautiful.',
    },
    {
      question: 'Do you help calculate the required number of flowers?',
      answer: 'Yes. We work with you to determine the optimal number of bouquets, arches, and venue decorations so everything looks stylish and harmonious, without unnecessary expenses.',
    },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/wedding_arch.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 w-full">
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Wedding Flowers</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">YOUR PERFECT DAY</p>
            <h1 className="font-serif text-cream mb-6">Wedding Flowers</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              Explore our curated floral collections to create a complete wedding set — from ceremony to reception.
              Tell us your vision and we'll bring it to life with seasonal blooms.
            </p>
          </div>
        </div>
      </section>



      {/* Gallery */}
      <section className="fade-in-section py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8">
            <p className="text-label text-dusty mb-2">Our Wedding Portfolio</p>
            <h2 className="font-serif text-charcoal">Exclusive Floral Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-[10px] overflow-hidden group">
                <img
                  src={img}
                  alt={`Wedding flowers gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Set Builder */}
      <section className="fade-in-section py-12 lg:py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-label text-dusty mb-2">Build Your Set</p>
            <h2 className="font-serif text-charcoal mb-3">Design Your Wedding Flowers</h2>
            <p className="text-warmgray max-w-2xl mx-auto">
              Select the items you need and specify quantities. We'll prepare a personalised quote for your perfect day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingItems.map((item) => {
              const qty = quantities[item.id] || 0;
              const isSelected = qty > 0;

              return (
                <div
                  key={item.id}
                  className={`rounded-[10px] overflow-hidden border-2 transition-all duration-300 ${isSelected
                    ? 'border-dusty shadow-lg shadow-dusty/10'
                    : 'border-charcoal/10 hover:border-charcoal/20'
                    }`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-dusty rounded-full flex items-center justify-center text-sm font-bold text-charcoal">
                        {qty}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-charcoal mb-1">{item.name}</h3>
                    <p className="text-sm text-warmgray mb-4 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/20 rounded-full">
                        <button
                          onClick={() => updateQty(item.id, -1, item.maxQty)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-cream rounded-l-full transition-colors"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1, item.maxQty)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-cream rounded-r-full transition-colors"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-warmgray">max {item.maxQty}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selection Summary */}
          {selectedItems.length > 0 && (
            <div className="mt-10 p-6 bg-cream rounded-[10px] border border-charcoal/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-charcoal mb-2">Your Wedding Set</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm"
                      >
                        <span className="font-medium text-charcoal">{quantities[item.id]}×</span>
                        <span className="text-warmgray">{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#inquiry-form"
                  className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Request Quote ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* From Bridal Bouquet Section */}
      <section className="fade-in-section py-16 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-cream">
              <img
                src="/images/line_plant_care.jpg"
                alt="Bridal bouquet illustration"
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div>
              <h2 className="font-serif text-charcoal text-3xl lg:text-4xl mb-4">
                From Bridal Bouquet to Festive Decor
              </h2>
              <h3 className="font-serif text-dusty text-xl mb-6">
                Exclusive Floral Collections for Your Day
              </h3>
              <p className="text-warmgray leading-relaxed mb-8">
                Make a request, and we'll help you design any wedding floral set you need.
                We work closely with every couple to create arrangements that reflect your unique style,
                from intimate ceremonies to grand celebrations.
              </p>
              <a
                href="#inquiry-form"
                className="btn-secondary"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="fade-in-section py-16 lg:py-20 bg-forest">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-dusty mx-auto mb-5" />
            <h2 className="font-serif text-cream mb-4">Let's Make Your Day Unforgettable</h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-8">
              Tell us your vision — and we'll help create the perfect wedding floral set for your big day.
            </p>
            <a
              href="#inquiry-form"
              className="inline-block px-8 py-4 bg-dusty text-charcoal font-medium rounded-full hover:bg-cream transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="fade-in-section py-16 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-label text-dusty mb-2">Get in Touch</p>
              <h2 className="font-serif text-charcoal mb-3">Wedding Flower Inquiry</h2>
              <p className="text-warmgray">
                Fill out the form below and we'll get back to you within 24 hours with a personalised quote.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[10px] p-8 lg:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="coupleNames" className="text-label text-charcoal mb-2 block">
                    Couple Names *
                  </Label>
                  <Input
                    id="coupleNames"
                    value={formData.coupleNames}
                    onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                    placeholder="e.g. Sarah & James"
                    required
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
                <div>
                  <Label htmlFor="weddingDate" className="text-label text-charcoal mb-2 block">
                    Wedding Date *
                  </Label>
                  <Input
                    id="weddingDate"
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    required
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-label text-charcoal mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-label text-charcoal mb-2 block">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+353 87 123 4567"
                    required
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="venueName" className="text-label text-charcoal mb-2 block">
                    Venue Name
                  </Label>
                  <Input
                    id="venueName"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    placeholder="e.g. Kilronan Castle"
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
                <div>
                  <Label htmlFor="colourTheme" className="text-label text-charcoal mb-2 block">
                    Colour Palette / Theme
                  </Label>
                  <Input
                    id="colourTheme"
                    value={formData.colourTheme}
                    onChange={(e) => setFormData({ ...formData, colourTheme: e.target.value })}
                    placeholder="e.g. Blush pink & ivory"
                    className="bg-cream/50 border-charcoal/20 focus:border-dusty"
                  />
                </div>
              </div>

              {/* Selected items summary in form */}
              {selectedItems.length > 0 && (
                <div>
                  <Label className="text-label text-charcoal mb-2 block">
                    Selected Items
                  </Label>
                  <div className="bg-cream/50 border border-charcoal/20 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedItems.map((item) => (
                        <span
                          key={item.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm border border-charcoal/10"
                        >
                          <span className="font-medium text-charcoal">{quantities[item.id]}×</span>
                          <span className="text-warmgray">{item.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes" className="text-label text-charcoal mb-2 block">
                  Additional Notes
                </Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your vision — style preferences, must-have flowers, any inspiration photos..."
                  rows={4}
                  className="w-full px-3 py-2 bg-cream/50 border border-charcoal/20 rounded-lg focus:outline-none focus:border-dusty resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="w-4 h-4 mt-1 rounded border-charcoal/30 text-dusty focus:ring-dusty"
                />
                <Label htmlFor="agreed" className="text-sm text-warmgray cursor-pointer">
                  I have read and agree to the <Link to="/terms" className="text-dusty hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-dusty hover:underline">Privacy Policy</Link>
                </Label>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Wedding Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-in-section py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-charcoal">FAQ</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-cream rounded-[10px] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-dusty/10 transition-colors"
                  >
                    <span className="font-medium text-charcoal pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-warmgray flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-warmgray flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-warmgray leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
