import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Star, Check, ChevronLeft, Heart, Share2 } from 'lucide-react';
import { getWorkshopById, workshops } from '@/data/workshops';
import { WorkshopCard } from '@/components/WorkshopCard';
import { toast } from 'sonner';

export function WorkshopDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workshop = id ? getWorkshopById(id) : undefined;

  const [participants, setParticipants] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!workshop) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16 text-center">
        <p className="font-serif text-2xl text-charcoal mb-4">Workshop not found</p>
        <Link to="/workshops" className="btn-primary">
          Back to Workshops
        </Link>
      </div>
    );
  }

  const currentImage = selectedImage || workshop.image;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isFull = workshop.currentParticipants >= workshop.maxParticipants;
  const spotsLeft = workshop.maxParticipants - workshop.currentParticipants;
  const totalPrice = workshop.price * participants;

  const handleBook = () => {
    if (isFull) {
      toast.error('This workshop is fully booked');
      return;
    }
    toast.success(`Booking ${participants} spot${participants > 1 ? 's' : ''} for ${workshop.title}`);
    // In a real app, this would redirect to checkout
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const relatedWorkshops = workshops
    .filter(w => w.id !== workshop.id && w.category === workshop.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/workshops" className="hover:text-charcoal transition-colors">Workshops</Link>
          <span>/</span>
          <span className="text-charcoal">{workshop.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-warmgray mb-6 hover:text-charcoal transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Workshops
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-[10px] overflow-hidden">
              <img
                src={currentImage}
                alt={workshop.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {workshop.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedImage(workshop.image)}
                  className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${currentImage === workshop.image ? 'border-forest' : 'border-transparent'
                    }`}
                >
                  <img
                    src={workshop.image}
                    alt={`${workshop.title} main`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {workshop.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${currentImage === img ? 'border-forest' : 'border-transparent'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${workshop.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Workshop Info */}
          <div className="lg:py-4">
            {/* Level Badge */}
            <span className="inline-block px-3 py-1 bg-dusty/20 text-charcoal text-xs font-medium rounded-full capitalize mb-4">
              {workshop.level} Level
            </span>

            <h1 className="font-serif text-3xl lg:text-4xl text-charcoal mb-4">
              {workshop.title}
            </h1>

            {/* Rating */}
            {workshop.reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-dusty text-dusty" />
                  <span className="text-sm">
                    {(workshop.reviews.reduce((acc, r) => acc + r.rating, 0) / workshop.reviews.length).toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-warmgray">
                  ({workshop.reviews.length} review{workshop.reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Key Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-warmgray">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(workshop.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-warmgray">
                <Clock className="w-5 h-5" />
                <span>{workshop.time} ({workshop.duration})</span>
              </div>
              <div className="flex items-center gap-3 text-warmgray">
                <MapPin className="w-5 h-5" />
                <span>{workshop.location}</span>
              </div>
              <div className="flex items-center gap-3 text-warmgray">
                <Users className="w-5 h-5" />
                <span>
                  {workshop.currentParticipants}/{workshop.maxParticipants} participants
                  {!isFull && spotsLeft <= 3 && (
                    <span className="text-dusty ml-2">— Only {spotsLeft} spots left!</span>
                  )}
                </span>
              </div>
            </div>

            {/* Price & Booking */}
            <div className="bg-white rounded-[10px] p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-serif text-charcoal">€{workshop.price}</span>
                  <span className="text-warmgray ml-2">per person</span>
                </div>
                {isFull && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                    Fully Booked
                  </span>
                )}
              </div>

              {/* Participants */}
              <div className="mb-4">
                <label className="text-label text-charcoal mb-2 block">Number of Participants</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-charcoal/20 rounded-full">
                    <button
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-cream rounded-l-full"
                      disabled={isFull}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{participants}</span>
                    <button
                      onClick={() => setParticipants(participants + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-cream rounded-r-full"
                      disabled={isFull || participants >= spotsLeft}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-4 border-t border-charcoal/10 mb-4">
                <span className="text-warmgray">Total</span>
                <span className="text-2xl font-serif text-charcoal">€{totalPrice}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleBook}
                  disabled={isFull}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFull ? 'Fully Booked' : 'Book Now'}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${isWishlisted
                      ? 'border-dusty bg-dusty text-charcoal'
                      : 'border-charcoal/20 text-charcoal hover:border-dusty'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-charcoal/20 text-charcoal hover:border-dusty flex items-center justify-center transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-[10px]">
              <div className="w-12 h-12 rounded-full bg-dusty/20 flex items-center justify-center">
                <span className="font-serif text-lg text-charcoal">
                  {workshop.instructor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm text-warmgray">Instructor</p>
                <p className="font-medium text-charcoal">{workshop.instructor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl text-charcoal mb-4">About This Workshop</h2>
            <div className="prose prose-warmgray max-w-none">
              {workshop.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-warmgray leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-charcoal mb-4">What's Included</h3>
            <ul className="space-y-3">
              {workshop.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-dusty flex-shrink-0 mt-0.5" />
                  <span className="text-warmgray">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews */}
        {workshop.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Reviews ({workshop.reviews.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {workshop.reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-[10px]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-charcoal">{review.author}</span>
                    <span className="text-sm text-warmgray">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-dusty text-dusty' : 'text-warmgray/30'}`}
                      />
                    ))}
                  </div>
                  <p className="text-warmgray">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Workshops */}
        {relatedWorkshops.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl text-charcoal mb-6">You May Also Like</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedWorkshops.map((w) => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
