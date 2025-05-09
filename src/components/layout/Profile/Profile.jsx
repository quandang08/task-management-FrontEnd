import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Building,
  MapPin,
  CalendarDays,
  Mail,
  Phone,
  Link,
} from "lucide-react";
import { Button } from "../Button/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../../features/user/UserThunk";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDetails({ userId }));
  }, [dispatch, userId]);

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!userDetails) return <div className="p-6 text-center">No user details found.</div>;

  const {
    fullName,
    email,
    avatarUrl,
    phoneNumber,
    address,
    dateOfBirth,
    githubUrl,
    jobTitle,
    companyName,
    createdAt,
    updatedAt,
  } = userDetails;

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
        {/* Header */}
        <div className="flex items-center gap-6 border-b-4 border-black pb-4">
          <img
            src={avatarUrl || "/default-avatar.jpg"}
            alt="avatar"
            className="w-24 h-24 rounded-none border-4 border-black object-cover"
          />
          <div>
            <h1 className="text-3xl font-extrabold uppercase">{fullName}</h1>
            <Button
              variant="outline"
              className="mt-2 border-black text-black hover:bg-black hover:text-white"
              onClick={handleOpenEditModal}
            >
              Manage your account
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="border-4 border-black p-4 space-y-4">
          <h2 className="text-2xl font-bold uppercase">About</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Briefcase className="w-5 h-5" />
              <span>{jobTitle || "No job title"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Building className="w-5 h-5" />
              <span>{companyName || "No company"}</span>
            </li>
            <li className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5" />
              <span>
                {dateOfBirth
                  ? new Date(dateOfBirth).toLocaleDateString()
                  : "No date of birth"}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>{address || "No address"}</span>
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex items-center gap-3 mt-1">
              <Mail className="w-5 h-5" />
              <a href={`mailto:${email}`} className="underline">
                {email}
              </a>
            </div>
            {phoneNumber && (
              <div className="flex items-center gap-3 mt-1">
                <Phone className="w-5 h-5" />
                <span>{phoneNumber}</span>
              </div>
            )}
            {githubUrl && (
              <div className="flex items-center gap-3 mt-1">
                <Link className="w-5 h-5" />
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="border-4 border-black p-4 space-y-2">
          <p className="text-sm text-gray-600">
            Joined: {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Last updated: {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal userDetails={userDetails} onClose={handleCloseEditModal} />
      )}
    </>
  );
}
