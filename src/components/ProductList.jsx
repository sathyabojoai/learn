import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

const ProductList = ({ products, onViewDetails, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <PackageSearch size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
        <h2>No products found</h2>
        <p>Click "Add Product" to create your first item.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
