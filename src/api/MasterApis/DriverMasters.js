import axiosInstance from '../axiosInstance'
import { masters } from '../apiRoutes' // wherever you keep your routes

export const getDrivers = (params) => {
  return axiosInstance.get(masters.driverMasters.getDrivers, { params })
}

export const addDriver = (data) => {
  return axiosInstance.post(masters.driverMasters.addDriver, data)
}

export const updateDriver = (id, data) => {
  return axiosInstance.put(masters.driverMasters.updateDriver(id), data)
}

export const deleteDriver = (id, data) => {
  return axiosInstance.delete(masters.driverMasters.deleteDriver(id), data)
}
