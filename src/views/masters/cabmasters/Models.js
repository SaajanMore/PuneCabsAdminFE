import React, { useState, useEffect } from 'react'
import MasterLayout from '../../../layout/MasterLayout'
import {
  getCabCategories,
  getManufacterers,
  addManufacterer,
  updateManufacterer,
  deleteManufacterer,
  getModels,
  updateModel,
  addModel,
  deleteModel,
} from '../../../api/MasterApis/CabMasters'

const Models = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({ name: '', category: '', manufacterer: '' })
  const [editingIndex, setEditingIndex] = useState(null)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [manufactererOptions, setManufactererOptions] = useState([])

  // Fetch category options
  useEffect(() => {
    getCabCategories().then((res) => {
      const options = res.data.results.map((c) => ({
        label: c.name,
        value: c.id,
      }))
      setCategoryOptions(options)
    })
  }, [])
  useEffect(() => {
    getManufacterers().then((res) => {
      const options = res.data.results.map((c) => ({
        label: c.name,
        value: c.id,
      }))
      setManufactererOptions(options)
    })
  }, [])
  // API call for manufacturers
  const fetchModels = async (page = 1, search = '') => {
    try {
      const response = await getModels({ page, search })

      if (response?.data?.results) {
        const adjustedResults = response.data.results.map((x) => ({
          ...x,
          category: x.category?.name || '-',
          manufacterer: x.manufacterer?.name || '-',
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
      const { results } = await fetchModels()
      setData(results)
    }
    loadInitialData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Model' },
    { key: 'manufacterer', label: 'Manufacterer' },
    { key: 'category', label: 'Category' },
  ]

  const formFields = [
    { name: 'name', label: 'Model', type: 'text' },
    {
      name: 'manufacterer',
      label: 'Manufacterer',
      type: 'select',
      options: manufactererOptions,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: categoryOptions,
    },
  ]

  const handleSubmit = async (e, done) => {
    e.preventDefault()
    try {
      const payload = {
        name: formData.name,
        category_id: formData.category, // ✅ Correct key for backend
        manufacterer_id: formData.manufacterer, // ✅ Correct key for backend
      }

      if (editingIndex !== null) {
        const itemToUpdate = data[editingIndex]
        const response = await updateModel(itemToUpdate.id, payload)

        const updated = [...data]
        updated[editingIndex] = {
          ...response.data,
          category:
            categoryOptions.find((opt) => opt.value === response.data.category)?.label || '-',
          manufacterer:
            manufactererOptions.find((opt) => opt.value === response.data.manufacterer)?.label ||
            '-',
        }
        setData(updated)
      } else {
        const response = await addModel(payload)
        const newItem = {
          ...response.data,
          category:
            categoryOptions.find((opt) => opt.value === response.data.category)?.label || '-',
          manufacterer:
            manufactererOptions.find((opt) => opt.value === response.data.manufacterer)?.label ||
            '-',
        }
        setData([...data, newItem])
      }

      setFormData({ name: '', category: '', manufacterer: '' })
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
      manufacterer: manufactererOptions.find((opt) => opt.label === item.manufacterer)?.value || '',
      category: categoryOptions.find((opt) => opt.label === item.category)?.value || '',
    })
    setEditingIndex(index)
  }

  const handleDelete = async (item) => {
    try {
      await deleteModel(item.id)
      setData(data.filter((d) => d.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
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
      onDeleteConfirmed={handleDelete}
      deleteType="danger"
      fetchData={fetchModels}
    />
  )
}

export default Models
