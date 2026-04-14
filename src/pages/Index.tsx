import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { products, categoryInfo } from '@/data/products';

const Index: React.FC = () => {
  const featured = products.slice(0, 6);

  return (
    <Layout>
      <HeroSection />

      {/* Content below hero needs its own background to cover the fixed hero image */}
      <div className="relative z-10 bg-background">
        {/* Categories */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            Shop by <span className="text-gold">Category</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryInfo.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border border-border hover:border-gold/40 hover:shadow-md transition-all group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-sm font-medium text-foreground text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold">
              Featured <span className="text-gold">Gifts</span>
            </h2>
            <Link to="/products" className="text-sm font-medium text-gold hover:text-gold-dark transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-charcoal py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🎁', title: 'Curated With Care', desc: 'Every box is hand-packed with premium products' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Delivered to your door within 3 business days' },
              { icon: '💳', title: 'Secure Payments', desc: 'Shop with confidence using secure checkout' },
            ].map(item => (
              <div key={item.title}>
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display font-semibold text-gold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-card/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
