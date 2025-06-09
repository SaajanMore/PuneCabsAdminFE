import React, { useState, useEffect } from 'react'
import MasterLayout from '../../../layout/MasterLayout'
import {
  getCabCategories,
  getManufacterers,
  addManufacterer,
  updateManufacterer,
  deleteManufacterer,
} from '../../../api/MasterApis/CabMasters'

const Manufacterers = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({ name: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  // API call for manufacturers
  const fetchManufacturers = async (page = 1, search = '') => {
    try {
      const response = await getManufacterers({ page, search })

      if (response?.data?.results) {
        const adjustedResults = response.data.results.map((x) => ({
          ...x,
          category: x.category?.name || '-',
        }))

        return {
          results: adjustedResults,
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
        }
      }

      return { results: [], count: 0 }
    } catch (err) {
      console.error('Error in fetchManufacturers:', err)
      return { results: [], count: 0 }
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      const { results } = await fetchManufacturers()
      setData(results)
    }
    loadInitialData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Manufacterer' },
  ]

  const formFields = [{ name: 'name', label: 'Manufacterer', type: 'text' }]

  const handleSubmit = async (e, done) => {
    e.preventDefault()
    try {
      const payload = {
        name: formData.name,
        category_id: formData.category, // ✅ Correct key for backend
      }

      if (editingIndex !== null) {
        const itemToUpdate = data[editingIndex]
        const response = await updateManufacterer(itemToUpdate.id, payload)

        const updated = [...data]
        updated[editingIndex] = {
          ...response.data,
        }
        setData(updated)
      } else {
        const response = await addManufacterer(payload)
        const newItem = {
          ...response.data,
        }
        setData([...data, newItem])
      }

      setFormData({ name: '', category: '' })
      setEditingIndex(null)
      done()
    } catch (error) {
      console.error('Error in form submit:', error.response?.data || error.message)
      done()
    }
  }

  const handleEdit = (item) => {
    const index = data.findIndex((d) => d.id === item.id)
    setFormData({
      name: item.name,
    })
    setEditingIndex(index)
  }

  const handleDelete = async (item) => {
    try {
      await deleteManufacterer(item.id)
      setData(data.filter((d) => d.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
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
      fetchData={fetchManufacturers}
    />
  )
}

export default Manufacterers
