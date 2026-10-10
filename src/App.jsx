import React, { useState } from 'react';
import { Plus, LayoutDashboard } from 'lucide-react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';

// Dummy initial data
const initialProducts = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    category: 'Electronics',
    stock: 45,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for travel and focused work sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    id: 2,
    name: 'Minimalist Mechanical Keyboard',
    price: 149.50,
    category: 'Electronics',
    stock: 12,
    description: 'Compact 75% mechanical keyboard with tactile switches, customizable RGB backlighting, and a sleek aluminum frame.',
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 499.00,
    category: 'Furniture',
    stock: 0,
    description: 'High-end ergonomic office chair designed for all-day comfort, featuring adjustable lumbar support, 4D armrests, and breathable mesh material.',
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80'
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Expandable view state
  const [viewingProduct, setViewingProduct] = useState(null);

  // CRUD Operations
  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now()
    };
    setProducts([...products, productWithId]);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setIsFormOpen(false);
    setEditingProduct(null);
    
    // If the currently viewed product is updated, update the view as well
    if (viewingProduct && viewingProduct.id === updatedProduct.id) {
      setViewingProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      if (viewingProduct && viewingProduct.id === id) {
        setViewingProduct(null);
      }
    }
  };

  // Handlers for modal opening
  const openNewProductForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditProductForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const openProductDetails = (product) => {
    setViewingProduct(product);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">
          <LayoutDashboard color="var(--primary-color)" />
          Product Catalog
        </h1>
        <button className="btn btn-primary" onClick={openNewProductForm}>
          <Plus size={20} /> Add Product
        </button>
      </header>

      <main>
        <ProductList 
          products={products} 
          onViewDetails={openProductDetails}
          onEdit={openEditProductForm}
          onDelete={handleDeleteProduct}
        />
      </main>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Product Details Modal (Expandable View) */}
      {viewingProduct && (
        <ProductDetails 
          product={viewingProduct} 
          onClose={() => setViewingProduct(null)}
          onEdit={(p) => {
            setViewingProduct(null); // Close details view when editing
            openEditProductForm(p);
          }}
          onDelete={(id) => {
            handleDeleteProduct(id);
          }}
        />
      )}
    </div>
  );
}

export default App;
