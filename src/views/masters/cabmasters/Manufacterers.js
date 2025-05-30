import React, { useState, useEffect } from 'react'
import MasterLayout from '../../../layout/MasterLayout'
import { getManufacturers } from '../../../api/MasterApis/CabMasters'

// Dummy data to simulate entries
const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', cab: 'Swift Dzire' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', cab: 'Toyota Etios' },
  { id: 3, name: 'Ali Khan', email: 'ali@example.com', cab: 'Hyundai Xcent' },
  { id: 4, name: 'Amit Ray', email: 'amit@example.com', cab: 'Innova Crysta' },
  { id: 5, name: 'Sana Malik', email: 'sana@example.com', cab: 'Honda City' },
  { id: 6, name: 'Rajiv Mehra', email: 'rajiv@example.com', cab: 'Tata Tiago' },
]

const Manufacterers = () => {
  // States
  const [data, setData] = useState(initialData)
  const [formData, setFormData] = useState({ name: '', email: '', cab: '' })
  const [editingIndex, setEditingIndex] = useState(null)
  const [manufacturers, setManufacturers] = useState([])

  useEffect(() => {
    getManufacturers()
      .then((response) => {
        if (response && response.data) {
          setManufacturers(response.data)
        } else {
          console.error('Failed to fetch manufacturers')
        }
      })
      .catch((error) => console.error(error))
  }, [])

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
      title="Manufacturers"
      data={data}
      columns={columns}
      formFields={formFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDeleteConfirmed={handleDelete}
      deleteType="danger"
    />
  )
}

export default Manufacterers
