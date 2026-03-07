import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from bag`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-cream border-l border-charcoal/10 w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-charcoal/10 pb-4">
          <SheetTitle className="font-serif text-2xl flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            Your Bag
            <span className="text-sm font-sans font-normal text-warmgray ml-auto mr-8">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-warmgray/30 mb-4" />
            <p className="font-serif text-xl text-charcoal mb-2">Your bag is empty</p>
            <p className="text-sm text-warmgray mb-6">Add some beautiful blooms!</p>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-white rounded-lg"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-charcoal truncate">{item.product.name}</h4>
                    {item.size && (
                      <p className="text-xs text-warmgray">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-warmgray">Color: {item.color}</p>
                    )}
                    <p className="text-sm font-medium text-charcoal mt-1">
                      €{item.product.price}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-cream hover:bg-dusty/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-cream hover:bg-dusty/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id, item.product.name)}
                        className="p-2 text-warmgray hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/10 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-warmgray">Subtotal</span>
                <span className="font-serif text-xl text-charcoal">€{totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-warmgray">
                Shipping calculated at checkout
              </p>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full block text-center"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary w-full"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
