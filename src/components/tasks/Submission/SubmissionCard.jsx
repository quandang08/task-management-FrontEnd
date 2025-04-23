import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import "./SubmissionCard.css";
import { useDispatch } from "react-redux";

const SubmissionCard = ({ item }) => {
  const dispatch = useDispatch();
  const handleAcceptDecline = (status) => {
    
    console.log(status);
  };

  const showIconButtons = true;

  return (
    <div className="submission-card">
      <div className="submission-content">
        <div className="submission-row">
          <span className="submission-label">GitHub:</span>
          <a
            href={item.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="submission-link"
          >
            <OpenInNewIcon fontSize="small" />
            Go to link
          </a>
        </div>

        <div className="submission-row text-sm">
          <span className="submission-label">Submission Time:</span>
          <span className="text-gray-700">{item.submissionTime}</span>
        </div>
      </div>

      {showIconButtons ? (
        <div className="submission-actions">
          <button
            onClick={() => handleAcceptDecline("ACCEPTED")}
            className="btn btn-accept"
          >
            <DoneIcon fontSize="small" />
            Accept
          </button>
          <button
            onClick={() => handleAcceptDecline("REJECTED")}
            className="btn btn-decline"
          >
            <CloseIcon fontSize="small" />
            Decline
          </button>
        </div>
      ) : (
        <button className="btn btn-accept-outline">Accept</button>
      )}
    </div>
  );
};

export default SubmissionCard;
