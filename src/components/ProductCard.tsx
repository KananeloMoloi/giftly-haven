import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      to={`/products/detail/${product.id}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:border-gold/40 transition-all hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-display font-semibold text-foreground text-base mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <p className="font-display font-bold text-gold text-lg">
          R{product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
