import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'giftbox_cart';
const CART_EXPIRY_KEY = 'giftbox_cart_ts';
const EXPIRY_HOURS = 24;

function loadStoredCart(): CartItem[] {
  try {
    const ts = localStorage.getItem(CART_EXPIRY_KEY);
    if (ts) {
      const elapsed = (Date.now() - parseInt(ts)) / (1000 * 60 * 60);
      if (elapsed > EXPIRY_HOURS) {
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(CART_EXPIRY_KEY);
        return [];
      }
    }
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    if (items.length > 0 && !localStorage.getItem(CART_EXPIRY_KEY)) {
      localStorage.setItem(CART_EXPIRY_KEY, Date.now().toString());
    }
    if (items.length === 0) {
      localStorage.removeItem(CART_EXPIRY_KEY);
    }
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
