import React from 'react'
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
  CRow,
} from '@coreui/react'

const Manufacterers = () => {
  return (
    <CForm>
      <CCard style={{ width: '100%' }}>
        <CCardHeader>
          <CCardTitle>CabMasters</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol xs>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                label="Full Name"
                // placeholder="Full Name"
                // text="Must be 8-20 characters long."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
            <CCol xs>
              <CFormInput
                type=""
                id="exampleFormControlInput1"
                label="Email address"
                placeholder="name@example.com"
                // text="Must be 8-20 characters long."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs>
              <CFormInput label="Email address" placeholder="Last name" aria-label="Last name" />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter className="text-end mt-4">
          <CButton color="primary">Primary</CButton>
        </CCardFooter>
      </CCard>
    </CForm>
    // </div>
  )
}

export default Manufacterers
