import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CSpinner,
} from '@coreui/react'
import DeleteConfirmationModal from '../components/popups/DeleteConfirmationModal '

const MasterLayout = ({
  title,
  data, // deprecated but kept for backward compatibility
  columns,
  formFields,
  formData,
  setFormData,
  onSubmit,
  onEdit,
  deleteType,
  onDeleteConfirmed,
  fetchData, // function to fetch paginated data
  errors = {},
  setErrors,
}) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [deleteDialog, setDeleteDialog] = useState({ show: false, item: null })
  const [dropdownOptions, setDropdownOptions] = useState({})
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const itemsPerPage = 2

  const loadData = async () => {
    if (!fetchData) return
    setLoading(true)
    try {
      const res = await fetchData(currentPage, search)
      setItems(res.results)
      setTotalPages(Math.ceil(res.count / itemsPerPage))
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 0) {
      loadData()
    }
  }, [currentPage, search, activeTab])

  useEffect(() => {
    formFields.forEach(async (field) => {
      if (field.type === 'select' && field.api) {
        try {
          const res = await fetch(field.api)
          const json = await res.json()
          setDropdownOptions((prev) => ({ ...prev, [field.name]: json.results || json }))
        } catch (error) {
          console.error(`Error fetching options for ${field.name}`, error)
        }
      }
    })
  }, [formFields])

  const confirmDelete = (item) => setDeleteDialog({ show: true, item })

  const proceedDelete = async () => {
    if (onDeleteConfirmed && deleteDialog.item) {
      await onDeleteConfirmed(deleteDialog.item)

      // Reload data to see if we need to shift to previous page
      const res = await fetchData(currentPage, search)

      const isLastItemOnPage = res.results.length === 0 && currentPage > 1
      const newPage = isLastItemOnPage ? currentPage - 1 : currentPage

      setCurrentPage(newPage)

      // Refetch after updating currentPage
      const updatedRes = await fetchData(newPage, search)
      setItems(updatedRes.results)
      setTotalPages(Math.ceil(updatedRes.count / itemsPerPage))
    }
    setDeleteDialog({ show: false, item: null })
  }
  console.log(errors, 'errors')
  console.log(formData, 'formData')

  return (
    <>
      <CNav variant="tabs" role="tablist" className="mb-3">
        <CNavItem>
          <CNavLink
            className="custom-navlink"
            active={activeTab === 0}
            onClick={() => setActiveTab(0)}
          >
            {title} List
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            className="custom-navlink"
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Add / Edit {title}
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeTab === 0}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CInputGroup>
                <CFormInput
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          <CCard>
            <CCardHeader>
              <CCardTitle>{title} List</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <div className="text-center">
                  <CSpinner />
                </div>
              ) : (
                <CTable striped hover responsive>
                  <CTableHead>
                    <CTableRow style={{ textWrap: 'nowrap' }}>
                      {columns.map((col) => (
                        <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
                      ))}
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {items.map((item, idx) => (
                      <CTableRow key={idx}>
                        {columns.map((col) => (
                          <CTableDataCell key={col.key}>
                            {col.key === 'sno'
                              ? (currentPage - 1) * itemsPerPage + idx + 1
                              : col.render
                                ? col.render(item)
                                : item[col.key]}
                          </CTableDataCell>
                        ))}
                        <CTableDataCell>
                          <CButton
                            size="sm"
                            color="info"
                            className="me-2"
                            onClick={() => {
                              onEdit(item, idx)
                              setActiveTab(1)
                            }}
                          >
                            Edit
                          </CButton>
                          <CButton size="sm" color="danger" onClick={() => confirmDelete(item)}>
                            Delete
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
            <CCardFooter>
              <CPagination align="end">
                {[...Array(totalPages)].map((_, idx) => (
                  <CPaginationItem
                    key={idx}
                    active={currentPage === idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                    style={{ cursor: 'pointer' }}
                  >
                    {idx + 1}
                  </CPaginationItem>
                ))}
              </CPagination>
            </CCardFooter>
          </CCard>
        </CTabPane>

        <CTabPane visible={activeTab === 1}>
          <CCard className="mb-4">
            <CCardHeader>
              <CCardTitle>Add / Edit {title}</CCardTitle>
            </CCardHeader>
            <CForm onSubmit={(e) => onSubmit(e, () => setActiveTab(0))}>
              <CCardBody>
                <CRow className="mb-3">
                  {formFields.map((field) => (
                    <CCol md={4} key={field.name}>
                      <CFormLabel className="mt-4 mb-2 mx-1 font-bold text-gray-500">
                        {field.label}
                      </CFormLabel>
                      {field.type === 'select' ? (
                        field.options ? (
                          <CFormSelect
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                            }
                          >
                            <option value="">-- Select --</option>
                            {field.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </CFormSelect>
                        ) : dropdownOptions[field.name] ? (
                          <CFormSelect
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                            }
                          >
                            <option value="">-- Select --</option>
                            {dropdownOptions[field.name].map((opt) => (
                              <option key={opt.value || opt.id} value={opt.value || opt.id}>
                                {opt.label || opt.name}
                              </option>
                            ))}
                          </CFormSelect>
                        ) : (
                          <CSpinner size="sm" />
                        )
                      ) : (
                        <>
                          <CFormInput
                            type={field.type || 'text'}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => {
                              if (field.name === 'mobile' && !/^\d*$/.test(e.target.value)) {
                                return
                              }
                              setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                              if (errors[field.name]) {
                                setErrors((prev) => ({ ...prev, [field.name]: '' }))
                              }
                            }}
                            invalid={!!errors[field.name]}
                            maxLength={field.maxLength}
                            pattern={field.pattern}
                          />
                          {errors[field.name] && (
                            <div className="text-danger small mt-1">{errors[field.name]}</div>
                          )}
                        </>
                      )}
                    </CCol>
                  ))}
                </CRow>
              </CCardBody>
              <CCardFooter className="text-end">
                <CButton type="submit" color="primary">
                  Save
                </CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CTabPane>
      </CTabContent>

      <DeleteConfirmationModal
        show={deleteDialog.show}
        onClose={() => setDeleteDialog({ show: false, item: null })}
        onConfirm={proceedDelete}
        title={`Delete ${title}`}
        message={`Are you sure you want to delete this ${title.toLowerCase()}?`}
        type={deleteType || 'warning'}
      />
    </>
  )
}

export default MasterLayout
