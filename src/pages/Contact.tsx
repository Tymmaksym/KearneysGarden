import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter, Linkedin, MessageSquare, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    notes: '',
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', notes: '' });
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-forest overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/contact/hero_bg.jpg)' }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-cream/60 mb-8">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-label text-dusty mb-4">Get in Touch</p>
            <h1 className="font-serif text-cream mb-6">Contact Us</h1>
            <p className="text-lg text-cream/80 leading-relaxed max-w-2xl">
              We're happy to hear from you! Whether you have a question about a product,
              a custom order, a workshop, or just want to say hello — feel free to reach out.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Banner */}
      <section className="fade-in-section py-8 bg-white border-b border-charcoal/10">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Call Us</p>
                <a href="tel:+353871234567" className="text-warmgray text-xs hover:text-forest transition-colors">+353 87 123 4567</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Email Us</p>
                <a href="mailto:hello@kearneysgardens.ie" className="text-warmgray text-xs hover:text-forest transition-colors">hello@kearneysgardens.ie</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Visit Us</p>
                <p className="text-warmgray text-xs">Cloonfad, Co. Roscommon</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Opening Hours</p>
                <p className="text-warmgray text-xs">Mon-Sat: 8am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="fade-in-section space-y-8">
              {/* Contact Details Card */}
              <div className="bg-forest rounded-[10px] p-8 text-cream">
                <h2 className="font-serif text-cream text-xl mb-6">Contact Details</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-cream mb-1">Address</p>
                      <p className="text-cream/70 text-sm">
                        Main Street, Cloonfad East,<br />
                        Cloonfad, Co. Roscommon,<br />
                        F35 H697, Ireland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-cream mb-1">Phone & WhatsApp</p>
                      <a href="tel:+353871234567" className="text-cream/70 text-sm hover:text-dusty transition-colors">
                        +353 87 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-cream mb-1">Email</p>
                      <a href="mailto:hello@kearneysgardens.ie" className="text-cream/70 text-sm hover:text-dusty transition-colors">
                        hello@kearneysgardens.ie
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-cream mb-1">Opening Hours</p>
                      <p className="text-cream/70 text-sm">
                        Monday – Saturday: 08:00 – 18:00<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-cream/20">
                  <p className="text-cream/70 text-sm mb-4">Follow us on social media</p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Embedded */}
              <div className="bg-white rounded-[10px] p-6">
                <h3 className="font-serif text-charcoal mb-4">Find Us</h3>
                <div className="aspect-video bg-cream rounded-[10px] overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=F35%20H697,%20Ireland&t=&z=14&ie=UTF8&iwloc=&output=embed&hl=en"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kearneys Gardens Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in-section bg-white rounded-[10px] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h2 className="font-serif text-charcoal">Send Us a Message</h2>
                  <p className="text-warmgray text-sm">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-label text-charcoal mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      required
                      className="bg-cream/50 border-charcoal/20 focus:border-forest"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-label text-charcoal mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="bg-cream/50 border-charcoal/20 focus:border-forest"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-label text-charcoal mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="bg-cream/50 border-charcoal/20 focus:border-forest"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-label text-charcoal mb-2 block">
                    Your Message
                  </Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us more about your enquiry..."
                    rows={5}
                    required
                    className="w-full px-3 py-2 bg-cream/50 border border-charcoal/20 rounded-lg focus:outline-none focus:border-forest resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>

                <p className="text-warmgray text-xs text-center">
                  By sending this message, you agree to our privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Teaser */}
      <section className="fade-in-section py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-cream">
              <img
                src="/images/line_contact.jpg"
                alt="Contact illustration"
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div>
              <Heart className="w-10 h-10 text-dusty mb-4" />
              <h2 className="font-serif text-charcoal mb-4">We're Here to Help</h2>
              <p className="text-warmgray leading-relaxed mb-6">
                Whether you're looking for the perfect bouquet, need advice on plant care,
                or want to book a workshop — we're always happy to chat.
                Drop by the shop, give us a call, or send a message.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forest" />
                  <p className="text-charcoal text-sm">Custom orders welcome</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forest" />
                  <p className="text-charcoal text-sm">Wedding & event consultations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forest" />
                  <p className="text-charcoal text-sm">Private workshop enquiries</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forest" />
                  <p className="text-charcoal text-sm">Plant care advice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
