import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser } from "..//../store/authSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="text-white p-6 bg-black min-h-screen">
        <h1 className="text-2xl">No profile found</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleUpdate = () => {
    // Example: update only bio (you can expand this to a form)
    dispatch(updateUser({ bio: "Updated bio 🎬" }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">About Me</h2>
          <p className="text-gray-300">{user.bio || "No bio set yet."}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
          >
            Update Bio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
