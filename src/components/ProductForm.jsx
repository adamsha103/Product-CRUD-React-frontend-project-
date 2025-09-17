import React, { useState, useEffect } from 'react'

export default function ProductForm({ onSave, onCancel, initialData, categories }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [category, setCategory] = useState(categories[0] || '')
  const [isActive, setIsActive] = useState(true)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setPrice(initialData.price ?? '')
      setOldPrice(initialData.oldPrice ?? '')
      setCategory(initialData.category || categories[0] || '')
      setIsActive(Boolean(initialData.isActive))
      setDescription(initialData.description || '')
    } else {
      setName('')
      setPrice('')
      setOldPrice('')
      setCategory(categories[0] || '')
      setIsActive(true)
      setDescription('')
    }
  }, [initialData, categories])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Product name is required')
    if (price === '' || isNaN(Number(price))) return alert('Valid price is required')

    const payload = {
      id: initialData?.id,
      name: name.trim(),
      price: Number(price),
      oldPrice: oldPrice === '' ? 0 : Number(oldPrice),
      category,
      isActive: Boolean(isActive),
      description: description.trim()
    }

    onSave(payload)
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <h2>{initialData ? 'Edit Product' : 'Add Product'}</h2>

      <label>
        Product Name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      </label>

      <div className="row">
        <label>
          Price
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" type="number" step="0.01" />
        </label>

        <label>
          Old Price
          <input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="0" type="number" step="0.01" />
        </label>
      </div>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="checkbox-label">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Active
      </label>

      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">Save</button>
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
