import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "@/services/address.service";

const Addresses = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all addresses of the logged-in user
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const data = await getAddresses();

      setAddresses(data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch addresses when component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Delete an address
  const handleDelete = async (addressId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await deleteAddress(addressId);

      toast.success("Address deleted successfully");

      // Refresh address list after deletion
      await fetchAddresses();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Make an address the default address
  const handleSetDefault = async (addressId) => {
    try {
      setActionLoading(true);

      await setDefaultAddress(addressId);

      toast.success("Default address updated");

      // Refresh list so the default badge updates
      await fetchAddresses();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update default address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B57D0] border-t-transparent" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Addresses
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your delivery addresses
          </p>
        </div>

        {/* Add Address Button */}
        <button
          type="button"
          onClick={() => navigate("/addresses/new")}
          className="rounded-xl bg-[#0B57D0] px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Address
        </button>
      </div>

      {/* Empty State */}
      {addresses.length === 0 ? (
        <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No addresses found
            </h2>

            <p className="mt-2 text-gray-500">
              Add an address to make checkout easier.
            </p>

            <button
              type="button"
              onClick={() => navigate("/addresses/new")}
              className="mt-5 rounded-lg bg-[#0B57D0] px-5 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Add Your First Address
            </button>
          </div>
        </div>
      ) : (
        /* Address List */
        <div className="grid gap-5 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Address Header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {address.fullName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {address.phone}
                  </p>
                </div>

                {/* Default Badge */}
                {address.isDefault && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Default
                  </span>
                )}
              </div>

              {/* Address Details */}
              <div className="text-sm leading-6 text-gray-600">
                <p>{address.addressLine}</p>

                <p>
                  {address.city}, {address.state}
                </p>

                <p>
                  {address.postalCode}, {address.country}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                {/* Edit */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/addresses/${address._id}/edit`)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleDelete(address._id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete
                </button>

                {/* Make Default */}
                {!address.isDefault && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      handleSetDefault(address._id)
                    }
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Make Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Addresses;