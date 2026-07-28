import React, { useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    id:0,
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        fullName: user.name,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfileModal;