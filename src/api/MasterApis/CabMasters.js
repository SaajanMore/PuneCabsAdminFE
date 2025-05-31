import axiosInstance from '../axiosInstance'
import { masters } from '../apiRoutes' // wherever you keep your routes

export const getManufacturers = () => {
  return axiosInstance.get(masters.cabmasters.getManufacterers)
}

export const addCabCategory = (data) => {
  return axiosInstance.post(masters.cabmasters.addCabCategory, data)
}

export const updateCabCategory = (id, data) => {
  return axiosInstance.put(masters.cabmasters.updateCabCategory(id), data)
}

export const deleteCabCategory = (id, data) => {
  return axiosInstance.delete(masters.cabmasters.deleteCabCategory(id), data)
}

export const getModels = () => {
  return axiosInstance.get(masters.cabmasters.getModels)
}

export const getCabCategories = () => {
  return axiosInstance.get(masters.cabmasters.getCabCategories)
}
