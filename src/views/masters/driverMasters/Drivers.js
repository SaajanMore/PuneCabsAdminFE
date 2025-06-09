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
import {
  addDriver,
  deleteDriver,
  getDrivers,
  updateDriver,
} from '../../../api/MasterApis/DriverMasters'
import formatToIndianDate from '../../../utils/formatToIndianDate'
import convertDateToISO from '../../../utils/convertDateToISO'

const Drivers = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: 'driver',
    mobile: '',
    gender: '',
    dob: '',
    address: '',
    ownership: '',
    profile_verification: 'pending',
    vehicle_verification: 'pending',
    documents_verification: 'pending',
    status: 'inactive',
    profile_picture: null,
    password: '',
  })

  const [editingIndex, setEditingIndex] = useState(null)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [manufactererOptions, setManufactererOptions] = useState([])
  const [errors, setErrors] = useState({})

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
  const fetchDrivers = async (page = 1, search = '') => {
    try {
      const response = await getDrivers({ page, search })
      console.log(response, 'res')

      if (response?.data?.results) {
        const adjustedResults = response.data.results.map((x) => ({
          ...x,
          dob: x.dob ? formatToIndianDate(x.dob) : '-',
          // profile_verification: x.profile_verification?.toUpperCase() || 'PENDING',
          // vehicle_verification: x.vehicle_verification?.toUpperCase() || 'PENDING',
          // documents_verification: x.documents_verification?.toUpperCase() || 'PENDING',
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
      const { results } = await fetchDrivers()
      setData(results)
    }
    loadInitialData()
  }, [])

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'profile_picture',
      label: 'Profile Picture',
      render: (row) =>
        row.profile_picture ? (
          <img
            className="rounded-full object-cover"
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            src={row.profile_picture}
            alt="Profile"
          />
        ) : (
          'N/A'
        ),
    },
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile' },
    // { key: 'gender', label: 'Gender' },
    // { key: 'dob', label: 'DOB' },
    // { key: 'address', label: 'Address' },
    { key: 'ownership', label: 'Ownership' },
    { key: 'profile_verification', label: 'Profile Verification' },
    { key: 'vehicle_verification', label: 'Vehicle Verification' },
    { key: 'documents_verification', label: 'Documents Verification' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ]

  const formFields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Driver', value: 'Driver' },
      ],
    },
    { name: 'mobile', label: 'Mobile', type: 'text', pattern: '[0-9]*', maxLength: 10 },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
    },
    {
      name: 'dob',
      label: 'DOB',
      type: 'date',
      render: (row) => (row.dob ? formatToIndianDate(row.dob) : 'N/A'),
    },
    { name: 'address', label: 'Address', type: 'text' },
    {
      name: 'ownership',
      label: 'Ownership',
      type: 'select',
      options: [
        { label: 'Own', value: 'Own' },
        { label: 'Rental', value: 'Rental' },
      ],
    },
    {
      name: 'profile_verification',
      label: 'Profile Verification',
      type: 'select',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
      ],
    },
    {
      name: 'vehicle_verification',
      label: 'Vehicle Verification',
      type: 'select',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
      ],
    },
    {
      name: 'documents_verification',
      label: 'Documents Verification',
      type: 'select',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
    },
    { name: 'password', label: 'Password', type: 'password' },
    // For profile picture input, handle separately (like file input with upload)
  ]

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Mobile number validation
    if (!formData.mobile || formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits'
      isValid = false
    }

    // Add other validations as needed
    // if (!formData.name) {
    //   newErrors.name = 'Name is required'
    //   isValid = false
    // }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e, done) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      const payload = { ...formData }

      if (editingIndex !== null) {
        const itemToUpdate = data[editingIndex]
        const response = await updateDriver(itemToUpdate.id, payload) // 👈 You'll need to define `updateDriver`
        const updated = [...data]
        updated[editingIndex] = response.data
        setData(updated)
      } else {
        const response = await addDriver(payload) // 👈 You'll need to define `addDriver`
        setData([...data, response.data])
      }

      // Reset form
      setFormData({
        name: '',
        username: '',
        email: '',
        role: 'Driver',
        mobile: '',
        gender: '',
        dob: '',
        address: '',
        ownership: 'Own',
        profile_verification: 'Pending',
        vehicle_verification: 'Pending',
        documents_verification: 'Pending',
        status: 'Inactive',
        profile_picture: null,
        password: '',
      })
      setEditingIndex(null)
      done()
    } catch (error) {
      console.error('Error in form submit:', error.response?.data || error.message)
      done()
    }
  }

  const handleEdit = (item) => {
    const index = data.findIndex((d) => d.id === item.id)
    const dobISO = item.dob ? convertDateToISO(item.dob) : ''
    setFormData({
      name: item.name || '',
      username: item.username || '',
      email: item.email || '',
      role: item.role || 'Driver',
      mobile: item.mobile || '',
      gender: item.gender || '',
      dob: dobISO || '',
      // dob: item.dob || '',
      address: item.address || '',
      ownership: item.ownership || 'Own',
      profile_verification: item.profile_verification || 'Pending',
      vehicle_verification: item.vehicle_verification || 'Pending',
      documents_verification: item.documents_verification || 'Pending',
      status: item.status || 'Inactive',
      profile_picture: item.profile_picture || null,
      password: item.password || '', // Do not populate password field while editing
    })
    setEditingIndex(index)
  }

  const handleDelete = async (item) => {
    try {
      await deleteDriver(item.id)
      setData(data.filter((d) => d.id !== item.id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <MasterLayout
      title="Drivers"
      data={data}
      columns={columns}
      formFields={formFields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDeleteConfirmed={handleDelete}
      deleteType="danger"
      fetchData={fetchDrivers}
      errors={errors}
      setErrors={setErrors}
    />
  )
}

export default Drivers
