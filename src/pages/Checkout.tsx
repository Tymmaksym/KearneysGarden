import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Lock, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';


export function Checkout() {

  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = totalPrice >= 50 ? 0 : 8;
  const total = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16 text-center">
        <h1 className="font-serif text-3xl text-charcoal mb-4">Your Bag is Empty</h1>
        <p className="text-warmgray mb-8">Add some items before checking out.</p>
        <Link to="/bouquets" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="px-4 sm:px-6 lg:px-12 max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-charcoal mb-4">Order Confirmed!</h1>
          <p className="text-warmgray mb-8">
            Thank you for your order. We've sent a confirmation email to you. 
            Your beautiful flowers will be on their way soon!
          </p>
          <div className="bg-white rounded-[10px] p-6 mb-8 text-left">
            <p className="text-sm text-warmgray mb-2">Order Number</p>
            <p className="font-serif text-xl text-charcoal mb-4">#KG{Date.now().toString().slice(-6)}</p>
            <p className="text-sm text-warmgray mb-2">Estimated Delivery</p>
            <p className="text-charcoal">{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-charcoal transition-colors">Bag</Link>
          <span>/</span>
          <span className="text-charcoal">Checkout</span>
        </nav>

        <h1 className="font-serif text-charcoal mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-charcoal' : 'text-warmgray'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'shipping' ? 'bg-charcoal text-cream' : 'bg-charcoal text-cream'}`}>
              <Check className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline text-sm font-medium">Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-warmgray" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-charcoal' : 'text-warmgray'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'payment' ? 'bg-charcoal text-cream' : 'bg-warmgray/20 text-warmgray'}`}>
              2
            </div>
            <span className="hidden sm:inline text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-[10px] p-6 lg:p-8">
                <h2 className="font-serif text-xl text-charcoal mb-6">Shipping Information</h2>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-label text-charcoal mb-2 block">First Name *</Label>
                      <Input id="firstName" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-label text-charcoal mb-2 block">Last Name *</Label>
                      <Input id="lastName" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-label text-charcoal mb-2 block">Email Address *</Label>
                    <Input id="email" type="email" required className="bg-cream/50 border-charcoal/20" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-label text-charcoal mb-2 block">Phone Number *</Label>
                    <Input id="phone" type="tel" required className="bg-cream/50 border-charcoal/20" />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-label text-charcoal mb-2 block">Street Address *</Label>
                    <Input id="address" required className="bg-cream/50 border-charcoal/20" />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city" className="text-label text-charcoal mb-2 block">City *</Label>
                      <Input id="city" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                    <div>
                      <Label htmlFor="postcode" className="text-label text-charcoal mb-2 block">Postcode *</Label>
                      <Input id="postcode" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-label text-charcoal mb-2 block">Country *</Label>
                      <select id="country" className="w-full px-3 py-2 bg-cream/50 border border-charcoal/20 rounded-lg">
                        <option value="IE">Ireland</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-label text-charcoal mb-2 block">Delivery Options</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-charcoal/20 rounded-lg cursor-pointer hover:border-dusty transition-colors">
                        <input type="radio" name="delivery" value="standard" defaultChecked className="w-4 h-4 text-dusty" />
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">Standard Delivery</p>
                          <p className="text-sm text-warmgray">2-3 business days</p>
                        </div>
                        <span className="text-charcoal">{shippingCost === 0 ? 'Free' : `€${shippingCost}`}</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-charcoal/20 rounded-lg cursor-pointer hover:border-dusty transition-colors">
                        <input type="radio" name="delivery" value="express" className="w-4 h-4 text-dusty" />
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">Express Delivery</p>
                          <p className="text-sm text-warmgray">Next business day</p>
                        </div>
                        <span className="text-charcoal">€12</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-label text-charcoal mb-2 block">Order Notes (Optional)</Label>
                    <textarea 
                      id="notes" 
                      rows={3}
                      placeholder="Special instructions for delivery..."
                      className="w-full px-3 py-2 bg-cream/50 border border-charcoal/20 rounded-lg resize-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-8">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-[10px] p-6 lg:p-8">
                <h2 className="font-serif text-xl text-charcoal mb-6">Payment Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-cream/50 rounded-lg">
                    <Lock className="w-5 h-5 text-charcoal" />
                    <span className="text-sm text-warmgray">Your payment information is secure and encrypted</span>
                  </div>

                  <div>
                    <Label className="text-label text-charcoal mb-2 block">Payment Method</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-dusty bg-dusty/5 rounded-lg cursor-pointer">
                        <input type="radio" name="payment" value="card" defaultChecked className="w-4 h-4 text-dusty" />
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium text-charcoal">Credit/Debit Card</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-label text-charcoal mb-2 block">Card Number *</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="bg-cream/50 border-charcoal/20" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="expiry" className="text-label text-charcoal mb-2 block">Expiry Date *</Label>
                      <Input id="expiry" placeholder="MM/YY" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-label text-charcoal mb-2 block">CVC *</Label>
                      <Input id="cvc" placeholder="123" required className="bg-cream/50 border-charcoal/20" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardName" className="text-label text-charcoal mb-2 block">Name on Card *</Label>
                    <Input id="cardName" required className="bg-cream/50 border-charcoal/20" />
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="saveCard" className="w-4 h-4 rounded border-charcoal/30" />
                    <Label htmlFor="saveCard" className="text-sm text-warmgray cursor-pointer">
                      Save card for future purchases
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    type="button" 
                    onClick={() => setStep('shipping')}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay €{total.toFixed(2)}</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-[10px] p-6">
              <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{item.product.name}</p>
                      {item.size && <p className="text-xs text-warmgray">Size: {item.size}</p>}
                      <p className="text-xs text-warmgray">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-charcoal">€{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-charcoal/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-warmgray">
                  <span>Subtotal</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-warmgray">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>
              
              <div className="border-t border-charcoal/10 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-serif text-2xl text-charcoal">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-warmgray">
                <Lock className="w-3 h-3" />
                <span>Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
