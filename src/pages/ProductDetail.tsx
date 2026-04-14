import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

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
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
