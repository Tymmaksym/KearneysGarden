import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, Edit, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function Account() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'addresses'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+353 87 123 4567',
  };

  const orders = [
    {
      id: 'KG123456',
      date: '2025-02-10',
      total: 68.00,
      status: 'delivered' as const,
      items: [{ name: 'The Meadow Arrangement', quantity: 1 }],
    },
    {
      id: 'KG123455',
      date: '2025-01-28',
      total: 85.00,
      status: 'delivered' as const,
      items: [{ name: 'Garden Roses', quantity: 1 }],
    },
    {
      id: 'KG123454',
      date: '2025-01-15',
      total: 150.00,
      status: 'processing' as const,
      items: [{ name: 'Workshop: Bridal Bouquet Masterclass', quantity: 1 }],
    },
  ];

  const wishlist = [
    { id: 'bouquet-2', name: 'Garden Roses', price: 85, image: '/images/hero_garden_wall.jpg' },
    { id: 'planter-1', name: 'Succulent Terrarium', price: 55, image: '/images/planter_terrarium.jpg' },
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      street: '42 Bloom Street',
      city: 'Dublin',
      postcode: 'D06 AB12',
      country: 'Ireland',
      isDefault: true,
    },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-warmgray bg-cream';
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal">My Account</span>
        </nav>

        <h1 className="font-serif text-charcoal mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-[10px] p-4 space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-dusty/20 text-charcoal' : 'text-warmgray hover:bg-cream'
                }`}
              >
                <User className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'orders' ? 'bg-dusty/20 text-charcoal' : 'text-warmgray hover:bg-cream'
                }`}
              >
                <Package className="w-5 h-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'wishlist' ? 'bg-dusty/20 text-charcoal' : 'text-warmgray hover:bg-cream'
                }`}
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'addresses' ? 'bg-dusty/20 text-charcoal' : 'text-warmgray hover:bg-cream'
                }`}
              >
                <MapPin className="w-5 h-5" />
                Addresses
              </button>
              <hr className="border-charcoal/10 my-2" />
              <button
                onClick={() => toast.success('Logged out successfully')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-warmgray hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-[10px] p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-dusty/20 flex items-center justify-center">
                        <span className="font-serif text-2xl text-charcoal">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-serif text-xl text-charcoal">{user.firstName} {user.lastName}</h2>
                        <p className="text-warmgray">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="p-2 hover:bg-cream rounded-full transition-colors"
                    >
                      <Edit className="w-5 h-5 text-warmgray" />
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-label text-charcoal mb-2 block">First Name</Label>
                          <Input defaultValue={user.firstName} className="bg-cream/50" />
                        </div>
                        <div>
                          <Label className="text-label text-charcoal mb-2 block">Last Name</Label>
                          <Input defaultValue={user.lastName} className="bg-cream/50" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-label text-charcoal mb-2 block">Email</Label>
                        <Input defaultValue={user.email} className="bg-cream/50" />
                      </div>
                      <div>
                        <Label className="text-label text-charcoal mb-2 block">Phone</Label>
                        <Input defaultValue={user.phone} className="bg-cream/50" />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-label text-warmgray mb-1">Phone</p>
                        <p className="text-charcoal">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-label text-warmgray mb-1">Member Since</p>
                        <p className="text-charcoal">January 2024</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-[10px] p-6 text-center">
                    <p className="font-serif text-3xl text-charcoal mb-1">{orders.length}</p>
                    <p className="text-sm text-warmgray">Total Orders</p>
                  </div>
                  <div className="bg-white rounded-[10px] p-6 text-center">
                    <p className="font-serif text-3xl text-charcoal mb-1">{wishlist.length}</p>
                    <p className="text-sm text-warmgray">Wishlist Items</p>
                  </div>
                  <div className="bg-white rounded-[10px] p-6 text-center">
                    <p className="font-serif text-3xl text-charcoal mb-1">{addresses.length}</p>
                    <p className="text-sm text-warmgray">Saved Addresses</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-[10px] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg text-charcoal">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-dusty hover:text-charcoal transition-colors flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-cream/50 rounded-lg">
                        <div>
                          <p className="font-medium text-charcoal">{order.id}</p>
                          <p className="text-sm text-warmgray">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-charcoal">€{order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-[10px] p-6">
                <h2 className="font-serif text-xl text-charcoal mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-charcoal/10 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-charcoal">{order.id}</p>
                          <p className="text-sm text-warmgray">{order.date}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-warmgray">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                        <p className="font-medium text-charcoal">€{order.total.toFixed(2)}</p>
                        <button className="text-sm text-dusty hover:text-charcoal transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-[10px] p-6">
                <h2 className="font-serif text-xl text-charcoal mb-6">My Wishlist</h2>
                {wishlist.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-charcoal/10 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-serif text-charcoal mb-1">{item.name}</h3>
                          <p className="text-charcoal font-medium mb-3">€{item.price}</p>
                          <div className="flex gap-2">
                            <button className="text-xs px-3 py-1.5 bg-charcoal text-cream rounded-full hover:bg-forest transition-colors">
                              Add to Bag
                            </button>
                            <button 
                              onClick={() => toast.success('Removed from wishlist')}
                              className="text-xs px-3 py-1.5 border border-charcoal/20 rounded-full hover:border-red-500 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-warmgray/30 mx-auto mb-4" />
                    <p className="text-warmgray">Your wishlist is empty</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-[10px] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-charcoal">Saved Addresses</h2>
                  <button 
                    onClick={() => toast.success('Add address feature coming soon')}
                    className="text-sm text-dusty hover:text-charcoal transition-colors"
                  >
                    + Add New
                  </button>
                </div>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-charcoal/10 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-charcoal">{address.type}</p>
                          {address.isDefault && (
                            <span className="text-xs px-2 py-0.5 bg-dusty/20 text-charcoal rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => toast.success('Edit address feature coming soon')}
                          className="text-sm text-warmgray hover:text-charcoal transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-warmgray text-sm">
                        {address.street}<br />
                        {address.city}, {address.postcode}<br />
                        {address.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
