import React, { useState, useEffect } from 'react'
import MasterLayout from '../../../layout/MasterLayout'
import {
  getCabCategories,
  updateCabCategory,
  addCabCategory,
  deleteCabCategory,
} from '../../../api/MasterApis/CabMasters'

const CabCategories = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({ name: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  // Fetch category options

  // API call for manufacturers
  const fetchCabCategories = async (page = 1, search = '') => {
    try {
      const response = await getCabCategories({ page, search })

      if (response?.data?.results) {
        const adjustedResults = response.data.results

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
      const { results } = await fetchCabCategories()
      setData(results)
    }
    loadInitialData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category' },
    // { key: 'category', label: 'Category' },
  ]

  const formFields = [{ name: 'name', label: 'Category', type: 'text' }]

  const handleSubmit = async (e, done) => {
    e.preventDefault()
    try {
      if (editingIndex !== null) {
        const itemToUpdate = data[editingIndex]
        const response = await updateCabCategory(itemToUpdate.id, formData)

        const updated = [...data]

        setData(updated)
      } else {
        const response = await addCabCategory(formData)
        const newItem = {
          ...response.data,
        }
        setData([...data, newItem])
      }
      setFormData({ name: '' })
      setEditingIndex(null)
      done()
    } catch (error) {
      console.error('Error in form submit:', error)
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
      await deleteCabCategory(item.id)
      setData(data.filter((d) => d.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <MasterLayout
      title="Categories"
      data={data}
      columns={columns}
      formFields={formFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDeleteConfirmed={handleDelete}
      deleteType="danger"
      fetchData={fetchCabCategories}
    />
  )
}

export default CabCategories
