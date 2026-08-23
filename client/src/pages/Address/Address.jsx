import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getAddresses,
    deleteAddress,
    setDefaultAddress,
} from "@/services/address.service";

const Address = () => {
    // Store all addresses of the logged-in user
    const [addresses, setAddresses] = useState([]);

    // Loading state while fetching addresses
    const [loading, setLoading] = useState(true);

    // Store the ID of the address currently being deleted
    const [deletingId, setDeletingId] = useState(null);

    // Store the ID of the address being made default
    const [defaultId, setDefaultId] = useState(null);


    // =====================================================
    // Fetch User Addresses
    // =====================================================

    const fetchAddresses = async () => {
        try {
            const data = await getAddresses();

            setAddresses(data);
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


    // Fetch addresses when page loads
    useEffect(() => {
        fetchAddresses();
    }, []);


    // =====================================================
    // Delete Address
    // =====================================================

    const handleDelete = async (addressId) => {
        try {
            setDeletingId(addressId);

            await deleteAddress(addressId);

            toast.success("Address deleted successfully");

            // Remove deleted address from UI
            setAddresses((prev) =>
                prev.filter(
                    (address) => address._id !== addressId
                )
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete address"
            );
        } finally {
            setDeletingId(null);
        }
    };


    // =====================================================
    // Set Default Address
    // =====================================================

    const handleSetDefault = async (addressId) => {
        try {
            setDefaultId(addressId);

            const updatedAddress =
                await setDefaultAddress(addressId);

            // Update default status locally
            setAddresses((prev) =>
                prev.map((address) => ({
                    ...address,
                    isDefault:
                        address._id ===
                        updatedAddress._id,
                }))
            );

            toast.success(
                "Default address updated"
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update default address"
            );
        } finally {
            setDefaultId(null);
        }
    };


    // =====================================================
    // Loading State
    // =====================================================

    if (loading) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center">
                <div
                    className="
                        h-10
                        w-10
                        animate-spin
                        rounded-full
                        border-4
                        border-[#0B57D0]
                        border-t-transparent
                    "
                />
            </section>
        );
    }


    // =====================================================
    // Address Page
    // =====================================================

    return (
        <section className="mx-auto max-w-5xl px-4 py-10">

            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Addresses
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your saved delivery addresses
                    </p>
                </div>


                {/* Add Address Button */}
                <button
                    type="button"
                    className="
                        rounded-xl
                        bg-[#0B57D0]
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    + Add Address
                </button>

            </div>


            {/* Empty State */}
            {addresses.length === 0 ? (
                <div
                    className="
                        flex
                        min-h-64
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-gray-300
                        bg-gray-50
                    "
                >
                    <div className="text-center">

                        <h2 className="text-xl font-semibold text-gray-800">
                            No addresses saved
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Add an address to make checkout faster.
                        </p>

                        <button
                            type="button"
                            className="
                                mt-5
                                rounded-lg
                                bg-[#0B57D0]
                                px-5
                                py-2.5
                                font-medium
                                text-white
                                hover:bg-blue-700
                            "
                        >
                            Add New Address
                        </button>

                    </div>
                </div>
            ) : (

                /* Address List */
                <div className="grid gap-5 md:grid-cols-2">

                    {addresses.map((address) => (

                        <div
                            key={address._id}
                            className="
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                                shadow-sm
                            "
                        >

                            {/* Address Header */}
                            <div className="flex items-start justify-between">

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
                                    <span
                                        className="
                                            rounded-full
                                            bg-green-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-green-700
                                        "
                                    >
                                        Default
                                    </span>
                                )}

                            </div>


                            {/* Address Details */}
                            <div className="mt-4 text-sm leading-6 text-gray-600">

                                <p>
                                    {address.addressLine}
                                </p>

                                <p>
                                    {address.city},{" "}
                                    {address.state} -{" "}
                                    {address.postalCode}
                                </p>

                                <p>
                                    {address.country}
                                </p>

                            </div>


                            {/* Actions */}
                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    gap-3
                                    border-t
                                    pt-4
                                "
                            >

                                {/* Edit */}
                                <button
                                    type="button"
                                    className="
                                        rounded-lg
                                        border
                                        border-gray-300
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        hover:bg-gray-100
                                    "
                                >
                                    Edit
                                </button>


                                {/* Delete */}
                                <button
                                    type="button"
                                    disabled={
                                        deletingId === address._id
                                    }
                                    onClick={() =>
                                        handleDelete(address._id)
                                    }
                                    className="
                                        rounded-lg
                                        border
                                        border-red-200
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-red-600
                                        hover:bg-red-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    {deletingId === address._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>


                                {/* Make Default */}
                                {!address.isDefault && (
                                    <button
                                        type="button"
                                        disabled={
                                            defaultId ===
                                            address._id
                                        }
                                        onClick={() =>
                                            handleSetDefault(
                                                address._id
                                            )
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-blue-200
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-[#0B57D0]
                                            hover:bg-blue-50
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {defaultId === address._id
                                            ? "Updating..."
                                            : "Make Default"}
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

export default Address;