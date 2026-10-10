import React from 'react';
import { X, Package, Tag, Edit3, Trash2 } from 'lucide-react';

const ProductDetails = ({ product, onClose, onEdit, onDelete }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Product Details</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="details-image" style={{ overflow: 'hidden' }}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <Package size={64} opacity={0.5} />
                {/* In a real app, this would be an <img src={product.imageUrl} /> */}
              </>
            )}
          </div>
          
          <h2 style={{ marginBottom: '0.5rem' }}>{product.name}</h2>
          <div className="product-price" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            ${product.price.toFixed(2)}
          </div>
          
          <div className="details-meta">
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Tag size={14} /> {product.category}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock Status</span>
              <span className="meta-value">
                {product.stock > 0 ? (
                  <span style={{ color: '#10b981' }}>In Stock ({product.stock})</span>
                ) : (
                  <span style={{ color: 'var(--danger-color)' }}>Out of Stock</span>
                )}
              </span>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <span className="meta-label">Description</span>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              {product.description || "No description provided."}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn btn-primary" onClick={() => onEdit(product)} style={{ flex: 1 }}>
              <Edit3 size={16} /> Edit Product
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(product.id)} style={{ flex: 1 }}>
              <Trash2 size={16} /> Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
