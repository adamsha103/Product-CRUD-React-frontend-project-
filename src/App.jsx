import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

const CATEGORIES = [
  'Vegetables',
  'Fruits & Nuts',
  'Dairy & creams',
  'Packages Food',
  'Staples'
]

const SAMPLE = [
  {
    id: '1',
    name: 'Tomato',
    price: 20,
    oldPrice: 25,
    category: 'Vegetables',
    isActive: true,
    description: 'Fresh red tomatoes'
  },
  {
    id: '2',
    name: 'Almonds',
    price: 500,
    oldPrice: 550,
    category: 'Fruits & Nuts',
    isActive: true,
    description: 'Premium almonds (250g)'
  }
]

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem('products')
      return raw ? JSON.parse(raw) : SAMPLE
    } catch (e) {
      return SAMPLE
    }
  })

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const handleAddClick = () => {
    setEditing(null)
    setShowForm(true)
  }

  const handleSave = (product) => {
    if (product.id) {
      // Edit
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
    } else {
      // Add
      const newProduct = { ...product, id: Date.now().toString() }
      setProducts((prev) => [newProduct, ...prev])
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleEdit = (id) => {
    const p = products.find((item) => item.id === id)
    if (p) {
      setEditing(p)
      setShowForm(true)
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Product CRUD - React (Front-end)</h1>
        <p className="muted">List, Add, Edit, Delete — data stored in localStorage</p>
      </header>

      <main>
        <div className="toolbar">
          <button className="btn primary" onClick={handleAddClick}>Add Product</button>
        </div>

        {showForm && (
          <ProductForm
            onSave={handleSave}
            onCancel={handleCancel}
            initialData={editing}
            categories={CATEGORIES}
          />
        )}

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <footer>
        <small>Built with React — JSX + CSS</small>
      </footer>
    </div>
  )
}
