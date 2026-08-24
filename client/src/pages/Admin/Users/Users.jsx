import { useEffect, useState } from "react";
import { Search, ShieldCheck, ShieldOff } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/services/api.service";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState(null);

    // =====================================================
    // Fetch Users
    // =====================================================

    const fetchUsers = async (searchValue = "") => {
        try {
            setIsLoading(true);

            const response = await api.get("/admin/users", {
                params: {
                    search: searchValue || undefined,
                },
            });

            setUsers(response.data.data || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to load users"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // =====================================================
    // Initial Load
    // =====================================================

    useEffect(() => {
        fetchUsers();
    }, []);

    // =====================================================
    // Search
    // =====================================================

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(search);
    };

    // =====================================================
    // Update Role
    // =====================================================

    const handleRoleChange = async (userId, role) => {
        try {
            setUpdatingUserId(userId);

            const response = await api.patch(
                `/admin/users/${userId}/role`,
                { role }
            );

            const updatedUser = response.data.data;

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? updatedUser
                        : user
                )
            );

            toast.success("User role updated successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update role"
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    // =====================================================
    // Toggle User Status
    // =====================================================

    const handleStatusToggle = async (userId) => {
        try {
            setUpdatingUserId(userId);

            const response = await api.patch(
                `/admin/users/${userId}/status`
            );

            const updatedUser = response.data.data;

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? updatedUser
                        : user
                )
            );

            toast.success(
                updatedUser.isActive
                    ? "User activated"
                    : "User deactivated"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to update user status"
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    // =====================================================
    // Loading
    // =====================================================

    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">
                    Loading users...
                </p>
            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="space-y-6 p-4 sm:p-6">

            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage registered users of your ShopAI store
                </p>
            </div>

            {/* Search */}

            <form
                onSubmit={handleSearch}
                className="flex max-w-xl gap-3"
            >
                <div className="relative flex-1">
                    <Search
                        size={19}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by name or email..."
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Search
                </button>
            </form>

            {/* Users Table */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px] text-left">

                        <thead>
                            <tr className="border-b bg-gray-50 text-sm text-gray-500">
                                <th className="px-5 py-4">
                                    User
                                </th>

                                <th className="px-5 py-4">
                                    Role
                                </th>

                                <th className="px-5 py-4">
                                    Status
                                </th>

                                <th className="px-5 py-4">
                                    Joined
                                </th>

                                <th className="px-5 py-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b last:border-b-0 hover:bg-gray-50"
                                    >

                                        {/* User */}

                                        <td className="px-5 py-4">

                                            <p className="font-medium text-gray-900">
                                                {user.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {user.email}
                                            </p>

                                        </td>

                                        {/* Role */}

                                        <td className="px-5 py-4">

                                            <select
                                                value={user.role}
                                                disabled={
                                                    updatingUserId ===
                                                    user._id
                                                }
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option value="user">
                                                    User
                                                </option>

                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>

                                        </td>

                                        {/* Status */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {user.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        {/* Joined */}

                                        <td className="px-5 py-4 text-sm text-gray-500">

                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}

                                        </td>

                                        {/* Action */}

                                        <td className="px-5 py-4">

                                            <button
                                                type="button"
                                                disabled={
                                                    updatingUserId ===
                                                    user._id
                                                }
                                                onClick={() =>
                                                    handleStatusToggle(
                                                        user._id
                                                    )
                                                }
                                                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                                    user.isActive
                                                        ? "border-red-200 text-red-600 hover:bg-red-50"
                                                        : "border-green-200 text-green-600 hover:bg-green-50"
                                                }`}
                                            >
                                                {user.isActive ? (
                                                    <>
                                                        <ShieldOff
                                                            size={16}
                                                        />
                                                        Deactivate
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck
                                                            size={16}
                                                        />
                                                        Activate
                                                    </>
                                                )}
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-5 py-10 text-center text-gray-500"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
};

export default Users;