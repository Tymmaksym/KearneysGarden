import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Gift } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from bag`);
  };

  const shippingCost = totalPrice >= 50 ? 0 : 8;
  const total = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16">
        <div className="px-4 sm:px-6 lg:px-12 text-center">
          <ShoppingBag className="w-20 h-20 text-warmgray/30 mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-charcoal mb-4">Your Bag is Empty</h1>
          <p className="text-warmgray mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/bouquets" className="btn-primary">
            Start Shopping
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
          <span className="text-charcoal">Shopping Bag</span>
        </nav>

        <h1 className="font-serif text-charcoal mb-8">Shopping Bag ({items.length})</h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="bg-white rounded-[10px] p-4 lg:p-6"
              >
                <div className="flex gap-4 lg:gap-6">
                  <Link to={`/product/${item.product.id}`} className="w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="font-serif text-lg text-charcoal hover:text-dusty transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.size && (
                          <p className="text-sm text-warmgray">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-warmgray">Color: {item.color}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleRemove(item.product.id, item.product.name)}
                        className="p-2 text-warmgray hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-charcoal/20 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream rounded-l-full"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream rounded-r-full"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <span className="font-medium text-charcoal">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={clearCart}
                className="text-sm text-warmgray hover:text-red-500 transition-colors"
              >
                Clear Bag
              </button>
              <Link to="/bouquets" className="text-sm text-charcoal hover:text-dusty transition-colors flex items-center gap-1">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-[10px] p-6">
              <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-warmgray">
                  <span>Subtotal</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-warmgray">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-xs text-green-600">You qualify for free shipping!</p>
                )}
              </div>
              
              <div className="border-t border-charcoal/10 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-serif text-2xl text-charcoal">€{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-warmgray mt-1">Including VAT</p>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Promo code"
                    className="flex-1 px-4 py-2 text-sm border border-charcoal/20 rounded-full focus:outline-none focus:border-dusty"
                  />
                  <button className="px-4 py-2 text-sm font-medium text-charcoal border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-cream transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-6 pt-6 border-t border-charcoal/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-warmgray">
                  <Gift className="w-4 h-4" />
                  <span>Add a gift message (free)</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-warmgray">
              <span>🔒 Secure Checkout</span>
              <span>✓ Quality Guaranteed</span>
              <span>🚚 Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
