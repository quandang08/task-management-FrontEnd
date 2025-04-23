import React, { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import "./SubmissionCard.css";
import { useDispatch } from "react-redux";
import { acceptOrDeclineSubmission } from "../../../features/submission/SubmissionThunk";


const SubmissionCard = ({ item }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(item.status);

  const handleAcceptDecline = (status) => {
    dispatch(acceptOrDeclineSubmission({ id: item.id, status }))
      .unwrap()
      .then(() => {
        setLocalStatus(status);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const isFinalized =
    localStatus === "ACCEPTED" || localStatus === "DECLINED";

  const formatDateTime = (rawDate) => {
    if (!rawDate) return "N/A";
    const trimmed = rawDate.split(".")[0];
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderStatusBadge = () => {
    if (localStatus === "ACCEPTED")
      return (
        <span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded">
          ✅ Accepted
        </span>
      );
    if (localStatus === "DECLINED")
      return (
        <span className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded">
          ❌ Declined
        </span>
      );
    return null;
  };

  return (
    <div className="submission-card border rounded-lg p-4 shadow-sm mb-4">
      <div className="submission-content space-y-2">
        <div>
          <span className="font-medium">GITHUB:</span>{" "}
          <a
            href={item.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            <OpenInNewIcon fontSize="small" className="mr-1" />
            Go to link
          </a>
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Submission Time:</span>{" "}
          {formatDateTime(item.submissionDate)}
        </div>
      </div>

      <div className="submission-actions mt-4">
        {isFinalized ? (
          renderStatusBadge()
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleAcceptDecline("ACCEPTED")}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <DoneIcon fontSize="small" className="mr-1" />
              Accept
            </button>
            <button
              onClick={() => handleAcceptDecline("DECLINED")}
              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <CloseIcon fontSize="small" className="mr-1" />
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
