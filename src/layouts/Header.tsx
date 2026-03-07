import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Bouquets', href: '/bouquets' },
    { name: 'Planters', href: '/planters' },
    { name: 'Weddings', href: '/wedding-flowers' },
    { name: 'Funerals', href: '/funeral-flowers' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Journal', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Pages where the header should start transparent (assuming they have dark hero sections)
  const TRANSPARENT_HEADER_ROUTES = [
    '/',
    '/bouquets',
    '/planters',
    '/wedding-flowers',
    '/funeral-flowers',
    '/workshops',
    '/about',
    '/contact',
    '/blog'
  ];

  const isTransparentPage = TRANSPARENT_HEADER_ROUTES.includes(location.pathname);
  const showSolidHeader = isScrolled || !isTransparentPage;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const headerBgClass = showSolidHeader
    ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3'
    : 'bg-black/[0.0001] backdrop-blur-[2px] py-4';



  const navLinkClass = (path: string) => {
    const active = isActive(path);
    if (showSolidHeader) {
      return active ? 'text-charcoal' : 'text-charcoal/70 hover:text-charcoal';
    }
    return active ? 'text-white' : 'text-white/80 hover:text-white';
  };

  const iconClass = showSolidHeader
    ? 'text-charcoal'
    : 'text-white hover:text-white/80';

  const hoverBgClass = showSolidHeader
    ? 'hover:bg-charcoal/5'
    : 'hover:bg-white/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-serif text-2xl lg:text-3xl tracking-tight transition-colors ${showSolidHeader ? 'text-charcoal' : 'text-white'
            }`}
        >
          Kearney's Gardens
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-base font-sans font-medium transition-colors relative ${navLinkClass(link.href)}`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className={`absolute -bottom-1 left-0 right-0 h-px ${showSolidHeader ? 'bg-dusty' : 'bg-white'}`} />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/account"
            className={`hidden sm:flex p-2 rounded-full transition-colors ${hoverBgClass}`}
          >
            <User className={`w-6 h-6 transition-colors ${iconClass}`} />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className={`p-2 rounded-full transition-colors relative ${hoverBgClass}`}
          >
            <ShoppingBag className={`w-6 h-6 transition-colors ${iconClass}`} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-dusty text-charcoal text-xs font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-full transition-colors ${hoverBgClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen
              ? <X className={`w-6 h-6 transition-colors ${iconClass}`} />
              : <Menu className={`w-6 h-6 transition-colors ${iconClass}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md border-t border-charcoal/10 py-6 px-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-left text-lg font-serif py-2 ${isActive(link.href) ? 'text-charcoal' : 'text-charcoal/70'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-charcoal/10 my-2" />
            <Link
              to="/account"
              className="text-left text-lg font-serif py-2 text-charcoal/70 flex items-center gap-3"
            >
              <User className="w-5 h-5" />
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
