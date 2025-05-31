import React, { useState } from 'react'
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
} from '@coreui/react'
import DeleteConfirmationModal from '../components/popups/DeleteConfirmationModal ' // 👈 Add your dialog component

const MasterLayout = ({
  title,
  data,
  columns,
  formFields,
  formData,
  setFormData,
  onSubmit,
  onEdit,
  deleteType,
  onDeleteConfirmed,
}) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [deleteDialog, setDeleteDialog] = useState({ show: false, item: null })
  const itemsPerPage = 5

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) => val.toString().toLowerCase().includes(search.toLowerCase())),
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const confirmDelete = (item) => {
    setDeleteDialog({ show: true, item })
  }

  const proceedDelete = () => {
    if (onDeleteConfirmed && deleteDialog.item) {
      onDeleteConfirmed(deleteDialog.item)
    }
    setDeleteDialog({ show: false, item: null })
  }

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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          <CCard>
            <CCardHeader>
              <CCardTitle>{title} List</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    {columns.map((col) => (
                      <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
                    ))}
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paginatedData.map((item, idx) => (
                    <CTableRow key={idx}>
                      {columns.map((col) => (
                        <CTableDataCell key={col.key}>
                          {col.key === 'sno'
                            ? (currentPage - 1) * itemsPerPage + idx + 1
                            : item[col.key]}
                        </CTableDataCell>
                      ))}
                      <CTableDataCell>
                        <CButton
                          size="sm"
                          color="info"
                          className="me-2"
                          onClick={() => {
                            onEdit(item, idx), setActiveTab(1)
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
            </CCardBody>
            <CCardFooter>
              <CPagination align="end">
                {[...Array(totalPages)].map((_, idx) => (
                  <CPaginationItem
                    key={idx + 1}
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
                      <CFormLabel>{field.label}</CFormLabel>
                      <CFormInput
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                      />
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

      {/* 🔴 Delete Confirmation Dialog */}
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
