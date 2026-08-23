import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createAddress,
  getAddressById,
  updateAddress,
} from "@/services/address.service";

const AddressForm = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();

  // If addressId exists, we are editing an address.
  const isEditMode = Boolean(addressId);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  // Address form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  // Fetch existing address when editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchAddress = async () => {
      try {
        const address = await getAddressById(addressId);

        setFormData({
          fullName: address.fullName || "",
          phone: address.phone || "",
          addressLine: address.addressLine || "",
          city: address.city || "",
          state: address.state || "",
          postalCode: address.postalCode || "",
          country: address.country || "India",
          isDefault: address.isDefault ?? false,
        });
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch address"
        );

        navigate("/addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [addressId, isEditMode, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit address
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.addressLine.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);

      if (isEditMode) {
        // Update existing address
        await updateAddress(addressId, formData);

        toast.success("Address updated successfully");
      } else {
        // Create new address
        await createAddress(formData);

        toast.success("Address added successfully");
      }

      // Go back to address list
      navigate("/addresses");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save address"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state while fetching address in edit mode
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </h1>

        <p className="mt-1 text-gray-500">
          {isEditMode
            ? "Update your delivery address"
            : "Add a new delivery address"}
        </p>
      </div>

      {/* Address Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>

          <textarea
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            rows={4}
            placeholder="House no., street, area, landmark..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
          />
        </div>

        {/* City + State */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            />
          </div>
        </div>

        {/* Postal Code + Country */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
            />
          </div>
        </div>

        {/* Default Address */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300"
          />

          <span className="text-sm font-medium text-gray-700">
            Set as default address
          </span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-[#0B57D0] py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Saving..."
              : isEditMode
                ? "Update Address"
                : "Save Address"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/addresses")}
            className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddressForm;