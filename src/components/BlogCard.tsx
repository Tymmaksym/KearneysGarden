import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <Link 
        to={`/blog/${post.id}`}
        className="group block"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-warmgray">
              <span className="px-3 py-1 bg-dusty/20 text-charcoal rounded-full text-xs">
                {post.category}
              </span>
              <span>{formatDate(post.date)}</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-charcoal group-hover:text-dusty transition-colors">
              {post.title}
            </h2>
            <p className="text-warmgray leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-warmgray">
              <span>By {post.author}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-charcoal font-medium group-hover:text-dusty transition-colors">
              Read Article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link 
        to={`/blog/${post.id}`}
        className="group flex gap-4"
      >
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-dusty">{post.category}</span>
          <h4 className="font-serif text-charcoal group-hover:text-dusty transition-colors line-clamp-2 mt-1">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 mt-2 text-xs text-warmgray">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/blog/${post.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] mb-4">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-warmgray">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="font-serif text-xl text-charcoal group-hover:text-dusty transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-warmgray line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
          <span>By {post.author}</span>
        </div>
      </div>
    </Link>
  );
}
