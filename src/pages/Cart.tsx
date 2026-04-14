import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
            <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Start adding gifts to fill it up!</p>
            <Link to="/products" className="inline-flex bg-gold text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-gold-dark transition-colors">
              Browse Gifts
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-3xl font-bold mb-8">Your Cart</h1>

          <div className="space-y-4 mb-8">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card rounded-lg border border-border p-4">
                <Link to={`/products/detail/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" loading="lazy" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/detail/${product.id}`} className="font-display font-semibold text-foreground hover:text-gold transition-colors line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category.replace('-', ' ')}</p>
                  <p className="font-semibold text-gold mt-1">R{product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-2 border border-border rounded-full">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 hover:text-gold transition-colors" disabled={quantity <= 1}>
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 hover:text-gold transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Items ({totalItems})</span>
              <span className="font-medium">R{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-sm">Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <span className="font-display text-xl font-bold">Total</span>
              <span className="font-display text-xl font-bold text-gold">R{totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center mt-6 bg-gold text-primary-foreground font-semibold py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
