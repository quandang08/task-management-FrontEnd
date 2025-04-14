import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const SubmissionCard = () => {
  const handleAcceptDecline = (status) => {
    console.log(status);
  };

  // Thay đổi điều kiện này theo logic của bạn, hiện tại dùng true để demo
  const showIconButtons = true;

  return (
    <div className="submissionCard max-w-lg w-full border-4 border-black bg-white p-6 shadow-[4px_4px_0_0_#000] space-y-4">
      {/* Khối thông tin */}
      <div className="space-y-3 text-black">
        {/* GitHub Link */}
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase">GitHub:</span>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline font-bold"
          >
            <OpenInNewIcon fontSize="small" />
            Go to link
          </a>
        </div>
        {/* Submission Time */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold uppercase">Submission Time:</span>
          <span className="text-gray-700">time here</span>
        </div>
      </div>

      {/* Hiển thị điều kiện: nếu showIconButtons là true, hiển thị 2 IconButton, ngược lại hiển thị nút Accept */}
      {showIconButtons ? (
        <div className="flex gap-5">
          <div className="flex gap-4">
            {/* Done Button */}
            <button
              onClick={() => handleAcceptDecline("ACCEPTED")}
              className="flex items-center gap-2 border-2 border-green-700 bg-green-100 text-green-900 font-bold px-4 py-2 uppercase
      shadow-[4px_4px_0_0_#000] hover:bg-green-200
      active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
            >
              <DoneIcon fontSize="small" />
              Accept
            </button>

            {/* Close Button */}
            <button
              onClick={() => handleAcceptDecline("DECLINED")}
              className="flex items-center gap-2 border-2 border-red-700 bg-red-100 text-red-900 font-bold px-4 py-2 uppercase
      shadow-[4px_4px_0_0_#000] hover:bg-red-200
      active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
            >
              <CloseIcon fontSize="small" />
              Decline
            </button>
          </div>
        </div>
      ) : (
        <button
          className="
            border-2 border-green-600 text-green-600 font-bold 
            px-3 py-2 uppercase
            hover:bg-green-600 hover:text-white 
            shadow-[4px_4px_0_0_#000] 
            -translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0
            transition-transform duration-100
          "
        >
          Accept
        </button>
      )}
    </div>
  );
};

export default SubmissionCard;
