import React, { useEffect, useState } from 'react'
import MasterLayout from '../../../layout/MasterLayout'
import {
  getCabCategories,
  addCabCategory,
  updateCabCategory,
  deleteCabCategory,
} from '../../../api/MasterApis/CabMasters'

const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', cab: 'Swift Dzire' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', cab: 'Toyota Etios' },
]

const CabCategories = () => {
  const [data, setData] = useState(initialData)
  const [formData, setFormData] = useState({ name: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    getCabCategories()
      .then((response) => {
        if (response && response.data.results) {
          setData(response.data.results)
        } else {
          console.log(response)
          console.error('Failed to fetch manufacturers')
        }
      })
      .catch((error) => console.error(error))
  }, [])

  const columns = [
    { key: 'sno', label: 'S.No.' },
    { key: 'name', label: 'Name' },
  ]

  const formFields = [{ name: 'name', label: 'Category' }]

  const handleSubmit = async (e, done) => {
    e.preventDefault()

    try {
      if (editingIndex !== null) {
        const itemToUpdate = data[editingIndex]
        const response = await updateCabCategory(itemToUpdate.id, formData)
        const updated = [...data]
        updated[editingIndex] = response.data
        setData(updated)
      } else {
        const response = await addCabCategory(formData)
        setData([...data, response.data])
      }
      setFormData({ name: '', email: '', cab: '' })
      setEditingIndex(null)
      done()
    } catch (error) {
      console.error('API error:', error)
      done() // to close the form/dialog even on error if needed
    }
  }

  const handleEdit = (item, index) => {
    setFormData({ name: item.name })
    const actualIndex = data.findIndex((d) => d.id === item.id)
    setEditingIndex(actualIndex)
  }

  const handleDelete = async (item) => {
    try {
      await deleteCabCategory(item.id)
      setData(data.filter((d) => d.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  console.log(formData, 'formData')
  console.log(data, 'data')
  return (
    <MasterLayout
      title="Cab Categories"
      data={data}
      columns={columns}
      formFields={formFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDeleteConfirmed={handleDelete}
    />
  )
}

export default CabCategories
