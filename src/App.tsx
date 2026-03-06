import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { CartDrawer } from '@/components/CartDrawer';

// Pages
import { Home } from '@/pages/Home';
import { Bouquets } from '@/pages/Bouquets';
import { Planters } from '@/pages/Planters';
import { ProductDetail } from '@/pages/ProductDetail';
import { Workshops } from '@/pages/Workshops';
import { WorkshopDetail } from '@/pages/WorkshopDetail';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { About } from '@/pages/About';
import { WeddingFlowers } from '@/pages/WeddingFlowers';
import { FuneralFlowers } from '@/pages/FuneralFlowers';
import { Contact } from '@/pages/Contact';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { Account } from '@/pages/Account';
import { ScrollToTop } from '@/components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-cream">
          <Header />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bouquets" element={<Bouquets />} />
              <Route path="/planters" element={<Planters />} />
              <Route path="/gifts" element={<Bouquets />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshop/:id" element={<WorkshopDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/wedding-flowers" element={<WeddingFlowers />} />
              <Route path="/funeral-flowers" element={<FuneralFlowers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />

              {/* Fallback routes */}
              <Route path="/delivery" element={<Contact />} />
              <Route path="/faqs" element={<Contact />} />
              <Route path="/terms" element={<Contact />} />
              <Route path="/privacy" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#F4F1EA',
                border: '1px solid rgba(26, 26, 26, 0.1)',
                color: '#1A1A1A',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
