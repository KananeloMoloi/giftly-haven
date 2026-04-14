import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { categoryInfo, Category } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') as Category | null;
  const { products } = useProducts();

  const filtered = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const activeName = activeCategory
    ? categoryInfo.find(c => c.id === activeCategory)?.name ?? 'All Gifts'
    : 'All Gifts';

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">{activeName}</h1>
            <p className="text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'gift' : 'gifts'} available
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              to="/products"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                !activeCategory
                  ? 'bg-gold text-primary-foreground border-gold'
                  : 'bg-card text-foreground border-border hover:border-gold/40'
              }`}
            >
              All
            </Link>
            {categoryInfo.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat.id
                    ? 'bg-gold text-primary-foreground border-gold'
                    : 'bg-card text-foreground border-border hover:border-gold/40'
                }`}
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No gifts found in this category.</p>
              <Link to="/products" className="text-gold hover:underline mt-2 inline-block">View all gifts</Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
