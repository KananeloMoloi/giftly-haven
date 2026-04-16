import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { categoryInfo } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';

const Index: React.FC = () => {
  const { products } = useProducts();
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
                className="relative flex flex-col items-center rounded-lg overflow-hidden border border-border hover:border-gold/40 hover:shadow-md transition-all group"
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <span className="absolute bottom-3 left-0 right-0 text-sm font-medium text-white text-center drop-shadow-lg">
                  {cat.name}
                </span>
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
