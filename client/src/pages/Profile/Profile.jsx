import { useAuth } from "@/context";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constants/routes";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Logout the current user
  const handleLogout = async () => {
    await logout();

    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Page Heading */}
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <div className="space-y-5">
        {/* Profile Information */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Personal Information
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">Name</p>

              <p className="font-medium text-gray-900">{user?.name || "N/A"}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="font-medium text-gray-900">
                {user?.email || "N/A"}
              </p>
            </div>

            {/* Role */}
            <div>
              <p className="text-sm text-gray-500">Role</p>

              <p className="font-medium capitalize text-gray-900">
                {user?.role || "user"}
              </p>
            </div>
          </div>
        </div>

        {/* My Addresses */}
        <button
          type="button"
          onClick={() => navigate("/addresses")}
          className="flex w-full items-center justify-between rounded-xl border bg-white p-6 text-left shadow-sm transition hover:border-[#0B57D0] hover:shadow-md"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              My Addresses
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your delivery addresses
            </p>
          </div>

          <span className="text-2xl text-gray-400">→</span>
        </button>

        {/* My Orders */}
        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="flex w-full items-center justify-between rounded-xl border bg-white p-6 text-left shadow-sm transition hover:border-[#0B57D0] hover:shadow-md"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>

            <p className="mt-1 text-sm text-gray-500">Manage your Orders</p>
          </div>

          <span className="text-2xl text-gray-400">→</span>
        </button>

        {/* Logout */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
