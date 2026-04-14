import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, Star, Send } from 'lucide-react';
import Layout from '@/components/Layout';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useReviews } from '@/hooks/useReviews';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { reviews, avgRating, addReview } = useReviews(id);
  const [added, setAdded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  // Review form
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/products" className="text-gold hover:underline">Browse all gifts</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(1.8)' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)' });
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addReview({
      productId: product.id,
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
  };

  const renderStars = (rating: number, size = 14) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Image with Zoom */}
            <div
              className="aspect-square overflow-hidden rounded-lg bg-card border border-border cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={zoomStyle}
              />
            </div>

            {/* Right — Details */}
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {product.category.replace('-', ' ')}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

              {/* Rating summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(Math.round(avgRating))}
                  <span className="text-sm text-muted-foreground">
                    {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>

              {/* Contents */}
              <div className="mb-6">
                <h3 className="font-display font-semibold text-lg mb-3">What's Inside</h3>
                <ul className="space-y-2">
                  {product.contents.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Add to Cart */}
              <div className="mt-auto pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <p className="font-display text-3xl font-bold text-gold">
                    R{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={handleAddToCart}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                      added
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-gold text-primary-foreground hover:bg-gold-dark'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {added ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
                {!product.inStock && (
                  <p className="text-destructive text-sm mt-2">Currently out of stock</p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-2xl font-bold mb-8">
              Customer Reviews
              {reviews.length > 0 && <span className="text-muted-foreground text-lg font-normal ml-2">({reviews.length})</span>}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Write a review */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
                  <h3 className="font-display font-semibold text-lg mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="John D."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5"
                          >
                            <Star
                              size={24}
                              className={`transition-colors ${
                                star <= (hoverRating || reviewRating)
                                  ? 'fill-gold text-gold'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Review</label>
                      <textarea
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="Share your experience with this gift..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground font-semibold py-2.5 rounded-full hover:bg-gold-dark transition-colors"
                    >
                      <Send size={16} />
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>

              {/* Reviews list */}
              <div className="lg:col-span-2">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                    <p className="font-medium">No reviews yet</p>
                    <p className="text-sm">Be the first to review this gift!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="bg-card rounded-lg border border-border p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold text-sm">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
