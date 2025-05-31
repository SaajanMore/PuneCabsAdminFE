import React, { useState } from 'react'
import MasterLayout from '../../../layout/MasterLayout'

const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', cab: 'Swift Dzire' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', cab: 'Toyota Etios' },
]

const Models = () => {
  const [data, setData] = useState(initialData)
  const [formData, setFormData] = useState({ name: '', email: '', cab: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'cab', label: 'Cab' },
  ]

  const formFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'cab', label: 'Cab Model' },
  ]

  const handleSubmit = (e, done) => {
    e.preventDefault()
    if (editingIndex !== null) {
      const updated = [...data]
      updated[editingIndex] = { ...formData, id: data[editingIndex].id }
      setData(updated)
    } else {
      setData([...data, { ...formData, id: data.length + 1 }])
    }
    setFormData({ name: '', email: '', cab: '' })
    setEditingIndex(null)
    done()
  }

  const handleEdit = (item, index) => {
    setFormData({ name: item.name, email: item.email, cab: item.cab })
    const actualIndex = data.findIndex((d) => d.id === item.id)
    setEditingIndex(actualIndex)
  }

  const handleDelete = (item) => {
    setData(data.filter((d) => d.id !== item.id))
  }

  return (
    <MasterLayout
      title="Models"
      data={data}
      columns={columns}
      formFields={formFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

export default Models
