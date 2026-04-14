import { useState, useEffect, useCallback } from 'react';

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const REVIEWS_KEY = 'giftbox_reviews';

function loadReviews(): Review[] {
  try {
    const stored = localStorage.getItem(REVIEWS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useReviews(productId?: string) {
  const [allReviews, setAllReviews] = useState<Review[]>(loadReviews);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
  }, [allReviews]);

  const reviews = productId ? allReviews.filter(r => r.productId === productId) : allReviews;

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const addReview = useCallback((review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setAllReviews(prev => [newReview, ...prev]);
  }, []);

  return { reviews, avgRating, addReview };
}
