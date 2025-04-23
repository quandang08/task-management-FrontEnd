import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionByTaskId } from "../../../features/submission/SubmissionThunk";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SubmissionsList({ handleClose, open }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");

  const { submissions = [] } = useSelector((state) => state.submission);

  React.useEffect(() => {
    if (taskId) {
      dispatch(fetchSubmissionByTaskId(taskId));
    }
  }, [taskId, dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="space-y-2">
          {submissions.length > 0 ? (
            <div className="space-y-2">
              {submissions.map((submissionItem, index) => (
                <SubmissionCard key={index} item={submissionItem} />
              ))}
            </div>
          ) : (
            <div className="text-center">No Submission Found</div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
