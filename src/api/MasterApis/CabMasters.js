import axiosInstance from '../axiosInstance'
import { masters } from '../apiRoutes' // wherever you keep your routes

export const getCabCategories = (params) => {
  return axiosInstance.get(masters.cabmasters.getCabCategories, { params })
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

export const getManufacterers = (params) => {
  return axiosInstance.get(masters.cabmasters.getManufacterers, { params })
}

export const addManufacterer = (data) => {
  return axiosInstance.post(masters.cabmasters.addManufacterer, data)
}

export const updateManufacterer = (id, data) => {
  return axiosInstance.put(masters.cabmasters.updateManufacterer(id), data)
}

export const deleteManufacterer = (id, data) => {
  return axiosInstance.delete(masters.cabmasters.deleteManufacterer(id), data)
}

export const getModels = () => {
  return axiosInstance.get(masters.cabmasters.getModels)
}

export const addModel = (data) => {
  return axiosInstance.post(masters.cabmasters.addModel, data)
}

export const updateModel = (id, data) => {
  return axiosInstance.put(masters.cabmasters.updateModel(id), data)
}

export const deleteModel = (id, data) => {
  return axiosInstance.delete(masters.cabmasters.deleteModel(id), data)
}
