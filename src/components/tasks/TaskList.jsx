import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { fetchTasks, fetchUsersTasks } from "../../features/task/TaskThunk";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");

  useEffect(() => {
    if (user?.role === "ROLE_ADMIN") {
      dispatch(fetchTasks({ status: filterValue }));
    } else {
      dispatch(fetchUsersTasks({ status: filterValue }));
    }

    console.log("Filter value:", filterValue);
  }, [filterValue, dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-5 w-[67%]">
      <div className="space-y-3">
      {Array.isArray(tasks) && tasks.length > 0 ? (
  tasks.map((task) => <TaskCard key={task.id} task={task} />)
) : (
  <div>No tasks available</div>
)}
      </div>
    </div>
  );
};

export default TaskList;
