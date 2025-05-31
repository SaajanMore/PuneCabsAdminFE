export const masters = {
  cabmasters: {
    // Categories (example)
    addCabCategory: 'cabs/categories/',
    getCabCategories: 'cabs/categories/',
    updateCabCategory: (id) => `cabs/categories/${id}/`,
    deleteCabCategory: (id) => `cabs/categories/${id}/`,

    // Manufacturers
    addManufacterer: 'masters/cabmasters/manufacturers/',
    getManufacterers: 'masters/cabmasters/manufacturers/',
    updateManufacterer: (id) => `masters/cabmasters/manufacturers/${id}/`,
    deleteManufacterer: (id) => `masters/cabmasters/manufacturers/${id}/`,

    // Models
    addModel: 'masters/cabmasters/models/',
    getModels: 'masters/cabmasters/models/',
    updateModel: (id) => `masters/cabmasters/models/${id}/`,
    deleteModel: (id) => `masters/cabmasters/models/${id}/`,
  },
}
