import api from "./api.service";

// Get all addresses of the logged-in user
const getAddresses = async () => {
  const response = await api.get("/addresses");

  return response.data.data;
};

// Get a single address by ID
const getAddressById = async (addressId) => {
  const response = await api.get(`/addresses/${addressId}`);

  return response.data.data;
};

// Create a new address
const createAddress = async (addressData) => {
  const response = await api.post("/addresses", addressData);

  return response.data.data;
};

// Update an existing address
const updateAddress = async (addressId, addressData) => {
  const response = await api.patch(
    `/addresses/${addressId}`,
    addressData
  );

  return response.data.data;
};

// Delete an address
const deleteAddress = async (addressId) => {
  const response = await api.delete(`/addresses/${addressId}`);

  return response.data.data;
};

// Set an address as default
const setDefaultAddress = async (addressId) => {
  const response = await api.patch(
    `/addresses/${addressId}/default`
  );

  return response.data.data;
};

export {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};