import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';
import type { Workshop } from '@/types';

interface WorkshopCardProps {
  workshop: Workshop;
  variant?: 'default' | 'compact';
}

export function WorkshopCard({ workshop, variant = 'default' }: WorkshopCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const isFull = workshop.currentParticipants >= workshop.maxParticipants;
  const spotsLeft = workshop.maxParticipants - workshop.currentParticipants;

  if (variant === 'compact') {
    return (
      <Link
        to={`/workshop/${workshop.id}`}
        className="group flex gap-4 p-4 bg-white rounded-[10px] hover:shadow-card transition-shadow"
      >
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-charcoal group-hover:text-dusty transition-colors line-clamp-1">
            {workshop.title}
          </h4>
          <div className="flex items-center gap-3 mt-2 text-xs text-warmgray">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(workshop.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {workshop.duration}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-medium text-charcoal">€{workshop.price}</span>
            {isFull ? (
              <span className="text-xs text-red-500">Fully Booked</span>
            ) : spotsLeft <= 3 ? (
              <span className="text-xs text-dusty">{spotsLeft} spots left</span>
            ) : null}
          </div>
        </div>
      </Link>
    );
  }

  const getDateParts = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-IE', { month: 'short' }),
      weekday: date.toLocaleDateString('en-IE', { weekday: 'long' })
    };
  };

  const { day, month } = getDateParts(workshop.date);

  return (
    <Link
      to={`/workshop/${workshop.id}`}
      className="group block bg-white rounded-[4px] overflow-hidden border border-charcoal/5 hover:border-dusty/30 hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-[4px] px-3 py-2 text-center min-w-[60px] shadow-sm">
          <span className="block text-xs font-bold text-dusty uppercase tracking-wider mb-0.5">{month}</span>
          <span className="block text-2xl font-serif text-charcoal leading-none">{day}</span>
        </div>

        {/* Level Badge */}
        <span className="absolute top-4 right-4 px-2 py-1 bg-charcoal/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-[2px]">
          {workshop.level}
        </span>

        {/* Availability Badge */}
        {isFull && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
            <span className="px-3 py-1 bg-charcoal text-white text-xs font-bold uppercase tracking-widest">
              Fully Booked
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-serif text-xl text-charcoal leading-tight group-hover:text-dusty transition-colors">
            {workshop.title}
          </h3>
          <span className="font-serif text-lg text-charcoal flex-shrink-0">€{workshop.price}</span>
        </div>

        <p className="text-sm text-warmgray mb-6 line-clamp-2 leading-relaxed">
          {workshop.description}
        </p>

        <div className="flex flex-wrap gap-y-2 text-sm text-warmgray border-t border-charcoal/10 pt-4">
          <div className="w-1/2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-dusty" />
            <span>{workshop.time}</span>
          </div>
          <div className="w-1/2 flex items-center gap-2">
            <Users className="w-4 h-4 text-dusty" />
            <span>{workshop.maxParticipants} spots</span>
          </div>
          <div className="w-full flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-dusty" />
            <span className="truncate">{workshop.location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
