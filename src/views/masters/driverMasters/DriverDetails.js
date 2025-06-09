import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDriverById } from '../../../api/MasterApis/DriverMasters'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CImage,
} from '@coreui/react'

const DriverDetails = () => {
  const { id } = useParams()
  const [driver, setDriver] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log('Driver ID:', id)
  useEffect(() => {
    console.log('Fetching driver details for ID:', id)
    const fetchDriver = async () => {
      try {
        const response = await getDriverById(id, {})
        console.log('Driver Details Response:', response)
        setDriver(response.data)
      } catch (error) {
        console.error('Error fetching driver:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDriver()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!driver) {
    return <div>Driver not found</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>Driver Details</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol md={3}>
                {driver.profile_picture ? (
                  <CImage rounded thumbnail src={driver.profile_picture} width={200} height={200} />
                ) : (
                  <div className="text-muted">No profile picture</div>
                )}
              </CCol>
              <CCol md={9}>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableDataCell>{driver.name}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Username</CTableHeaderCell>
                      <CTableDataCell>{driver.username}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableDataCell>{driver.email}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Mobile</CTableHeaderCell>
                      <CTableDataCell>{driver.mobile}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableDataCell>{driver.status}</CTableDataCell>
                    </CTableRow>
                    {/* Add more fields as needed */}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DriverDetails
