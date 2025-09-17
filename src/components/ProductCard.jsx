import React from 'react'

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className={`card ${product.isActive ? 'active' : 'inactive'}`}>
      <div className="card-body">
        <div className="card-top">
          <h3>{product.name}</h3>
          <div className="badges">
            <span className="badge">{product.category}</span>
            {product.isActive ? <span className="badge green">Active</span> : <span className="badge gray">Inactive</span>}
          </div>
        </div>

        <p className="desc">{product.description}</p>

        <div className="price-row">
          <div className="price">
            ₹{Number(product.price).toFixed(2)}
            {product.oldPrice ? <span className="old">₹{Number(product.oldPrice).toFixed(2)}</span> : null}
          </div>

          <div className="actions">
            <button className="btn" onClick={onEdit}>Edit</button>
            <button className="btn danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
