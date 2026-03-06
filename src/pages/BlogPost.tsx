import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Share2, Facebook, Twitter, Linkedin, ChevronLeft } from 'lucide-react';
import { getBlogPostById, getRelatedPosts } from '@/data/blog';
import { BlogCard } from '@/components/BlogCard';
import { toast } from 'sonner';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getBlogPostById(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16 text-center">
        <p className="font-serif text-2xl text-charcoal mb-4">Article not found</p>
        <Link to="/blog" className="btn-primary">
          Back to Journal
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const relatedPosts = getRelatedPosts(post.id);

  const handleShare = (platform: string) => {
    toast.success(`Shared on ${platform}`);
  };

  // Parse content and convert markdown-like syntax to HTML
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="font-serif text-2xl text-charcoal mt-10 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={key++} className="font-medium text-charcoal mb-4">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      } else if (line.startsWith('- ')) {
        // Handle list items
        const listItems = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].replace('- ', ''));
          i++;
        }
        i--; // Adjust for the outer loop increment
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 mb-6 ml-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-warmgray">{item}</li>
            ))}
          </ul>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
        continue;
      } else {
        elements.push(
          <p key={key++} className="text-warmgray leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warmgray mb-6">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-charcoal transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-warmgray mb-8 hover:text-charcoal transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Journal
        </button>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-dusty/20 text-charcoal text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-warmgray">{formatDate(post.date)}</span>
              <span className="text-warmgray">•</span>
              <span className="text-sm text-warmgray flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl lg:text-5xl text-charcoal mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-warmgray leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-charcoal/10">
              <div className="w-12 h-12 rounded-full bg-dusty/20 flex items-center justify-center">
                <span className="font-serif text-lg text-charcoal">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-charcoal">{post.author}</p>
                <p className="text-sm text-warmgray">Floral Designer</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-[10px] overflow-hidden mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-charcoal/10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white text-charcoal text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-warmgray">Share this article:</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare('Facebook')}
                className="p-2 bg-white rounded-full hover:bg-dusty/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('Twitter')}
                className="p-2 bg-white rounded-full hover:bg-dusty/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('LinkedIn')}
                className="p-2 bg-white rounded-full hover:bg-dusty/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied to clipboard');
                }}
                className="p-2 bg-white rounded-full hover:bg-dusty/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-charcoal mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} variant="compact" />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
