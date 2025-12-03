import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Laoding/Laoding";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl rounded-3xl shadow-[0_0_50px_rgba(191,191,191,1)] p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 shadow-[0_0_25px_rgba(191,191,191,1)] animate-pulse">
            <img
              src={user?.avatar || "https://i.pravatar.cc/300"}
              alt={user?.name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-gray-300 mt-1">
            {user?.email || "user@email.com"}
          </p>
        </div>

        {/* User Info Grid */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-400">Username</h4>
            <p className="text-white font-semibold">
              {user?.displayName || "N/A"}
            </p>
          </div>

          <div>
            <h4 className="text-gray-400">Phone</h4>
            <p className="text-white font-semibold">{user?.phone || "N/A"}</p>
          </div>

          <div>
            <h4 className="text-gray-400">Address</h4>
            <p className="text-white font-semibold">
              {user?.address || "Bangladesh"}
            </p>
          </div>

          <div>
            <h4 className="text-gray-400">Member Since</h4>
            <p className="text-white font-semibold">
              {new Date().toLocaleDateString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Optional Action Buttons */}
        <div className="md:col-span-3 flex justify-center mt-6 gap-6">
          <button className="premium-btn">Edit Profile</button>
          <button className="premium-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
