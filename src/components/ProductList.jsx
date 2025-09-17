import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return <p className="empty">No products yet. Click "Add Product" to create one.</p>
  }

  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onEdit={() => onEdit(p.id)} onDelete={() => onDelete(p.id)} />
      ))}
    </div>
  )
}
