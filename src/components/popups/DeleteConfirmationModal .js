import React from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const DeleteConfirmationModal = ({ show, onClose, onConfirm, title, message, type = 'info' }) => {
  const getColor = () => {
    switch (type) {
      case 'warning':
        return 'warning'
      case 'danger':
        return 'danger'
      case 'success':
        return 'success'
      default:
        return 'info'
    }
  }

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color={getColor()} onClick={onConfirm}>
          Yes, Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteConfirmationModal
