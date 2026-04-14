import { useState, useEffect, useCallback } from 'react';
import { Product, Category, products as defaultProducts } from '@/data/products';

const CUSTOM_PRODUCTS_KEY = 'giftbox_custom_products';
const DELETED_PRODUCTS_KEY = 'giftbox_deleted_products';

function loadCustomProducts(): Product[] {
  try {
    const stored = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadDeletedIds(): string[] {
  try {
    const stored = localStorage.getItem(DELETED_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useProducts() {
  const [customProducts, setCustomProducts] = useState<Product[]>(loadCustomProducts);
  const [deletedIds, setDeletedIds] = useState<string[]>(loadDeletedIds);

  useEffect(() => {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
  }, [customProducts]);

  useEffect(() => {
    localStorage.setItem(DELETED_PRODUCTS_KEY, JSON.stringify(deletedIds));
  }, [deletedIds]);

  const allProducts = [
    ...defaultProducts.filter(p => !deletedIds.includes(p.id)),
    ...customProducts,
  ];

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const id = `custom-${Date.now()}`;
    setCustomProducts(prev => [...prev, { ...product, id }]);
    return id;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Omit<Product, 'id'>>) => {
    // Check if it's a default product
    const isDefault = defaultProducts.some(p => p.id === id);
    if (isDefault) {
      // Move to custom with edits
      const original = defaultProducts.find(p => p.id === id)!;
      setDeletedIds(prev => [...prev, id]);
      const newId = `edited-${id}-${Date.now()}`;
      setCustomProducts(prev => [...prev, { ...original, ...updates, id: newId }]);
    } else {
      setCustomProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  }, []);

  const deleteProduct = useCallback((id: string) => {
    const isDefault = defaultProducts.some(p => p.id === id);
    if (isDefault) {
      setDeletedIds(prev => [...prev, id]);
    } else {
      setCustomProducts(prev => prev.filter(p => p.id !== id));
    }
  }, []);

  return { products: allProducts, addProduct, updateProduct, deleteProduct };
}
