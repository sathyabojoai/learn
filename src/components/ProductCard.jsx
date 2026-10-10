import React from 'react';
import { Edit3, Trash2, Maximize2, Image as ImageIcon } from 'lucide-react';

const ProductCard = ({ product, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="product-card glass-panel">
      <div className="product-image-container">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <ImageIcon size={48} opacity={0.5} />
        )}
        {/* Placeholder for actual product image */}
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
          {product.category}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Stock: {product.stock} units
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-primary" 
            style={{ flex: 1 }}
            onClick={() => onViewDetails(product)}
          >
            <Maximize2 size={16} /> View
          </button>
          
          <button 
            className="btn-icon" 
            onClick={() => onEdit(product)}
            title="Edit"
          >
            <Edit3 size={18} />
          </button>
          
          <button 
            className="btn-icon" 
            style={{ color: 'var(--danger-color)' }}
            onClick={() => onDelete(product.id)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
