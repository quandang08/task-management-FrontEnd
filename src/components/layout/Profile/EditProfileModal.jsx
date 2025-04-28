import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../features/user/UserThunk";
import { fetchUserDetails } from "../../../features/user/UserThunk";
import {
  FaPhone,
  FaGithub,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function EditProfileModal({ userDetails, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    avatarUrl: userDetails.avatarUrl || "",
    phoneNumber: userDetails.phoneNumber || "",
    address: userDetails.address || "",
    dateOfBirth: userDetails.dateOfBirth
      ? userDetails.dateOfBirth.split("T")[0]
      : "",
    githubUrl: userDetails.githubUrl || "",
    jobTitle: userDetails.jobTitle || "",
    companyName: userDetails.companyName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateUserDetails({
          userId: userDetails.user.id,
          userDetails: formData,
        })
      ).unwrap();

      // Refetch lại để đồng bộ
      await dispatch(fetchUserDetails({ userId: userDetails.user.id }));

      onClose();
    } catch (error) {
      alert(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar URL */}
          <div>
            <label htmlFor="avatarUrl" className="block font-semibold">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatarUrl"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block font-semibold flex items-center"
            >
              <FaPhone className="mr-2" /> Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0123456789"
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block font-semibold flex items-center"
            >
              <FaMapMarkedAlt className="mr-2" /> Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block font-semibold flex items-center"
            >
              <FaCalendarAlt className="mr-2" /> Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label
              htmlFor="githubUrl"
              className="block font-semibold flex items-center"
            >
              <FaGithub className="mr-2" /> GitHub URL
            </label>
            <input
              type="text"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block font-semibold flex items-center"
            >
              <FaBuilding className="mr-2" /> Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full border p-2 mt-1"
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block font-semibold flex items-center"
            >
              <FaBuilding className="mr-2" /> Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Company"
              className="w-full border p-2 mt-1"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
