import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Fresh Bouquets', href: '/bouquets' },
      { name: 'Seasonal Planters', href: '/planters' },
      { name: 'Funeral Flowers', href: '/funeral-flowers' },
      { name: 'Gift Cards', href: '/gifts' },
      { name: 'Workshops', href: '/workshops' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Journal', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Delivery Info', href: '/delivery' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Care Guide', href: '/blog/how-to-keep-your-cut-flowers-fresh-longer' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-forest text-cream">
      <div className="px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-serif text-2xl lg:text-3xl text-cream block mb-6">
              Kearney's Gardens
            </Link>
            <p className="text-cream/70 mb-6 max-w-sm leading-relaxed">
              Small-batch bouquets and seasonal planters, made with love in Ireland.
              Fresh flowers, arranged like a garden.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-cream/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Main Street, Cloonfad East,<br />
                  Cloonfad, Co. Roscommon,<br />
                  F35 H697, Ireland
                </span>
              </div>
              <a
                href="tel:+353871234567"
                className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+353 87 123 4567</span>
              </a>
              <div className="flex items-start gap-3 text-cream/70">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Monday – Saturday: 08:00 – 18:00<br />
                  Sunday: Closed
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-cream" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
              >
                <Twitter className="w-5 h-5 text-cream" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-cream" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cream/10 rounded-full hover:bg-cream/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-cream" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-label text-cream/50 mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-label text-cream/50 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-label text-cream/50 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/50">
            © {currentYear} Kearney's Gardens. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-cream/50 hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-cream/50 hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
