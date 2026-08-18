import { useAuth } from "@/context";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;