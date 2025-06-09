export const masters = {
  cabmasters: {
    // Categories (example)
    addCabCategory: 'cabs/categories/',
    getCabCategories: 'cabs/categories/',
    updateCabCategory: (id) => `cabs/categories/${id}/`,
    deleteCabCategory: (id) => `cabs/categories/${id}/`,

    // manufacterers
    addManufacterer: 'cabs/manufacterers/',
    getManufacterers: 'cabs/manufacterers/',
    updateManufacterer: (id) => `cabs/manufacterers/${id}/`,
    deleteManufacterer: (id) => `cabs/manufacterers/${id}/`,

    // Models
    addModel: 'cabs/models/',
    getModels: 'cabs/models/',
    updateModel: (id) => `cabs/models/${id}/`,
    deleteModel: (id) => `cabs/models/${id}/`,
  },
  driverMasters: {
    // Drivers (example)
    addDriver: 'drivers/',
    getDrivers: 'drivers/',
    updateDriver: (id) => `drivers/${id}/`,
    deleteDriver: (id) => `drivers/${id}/`,
  },
}
