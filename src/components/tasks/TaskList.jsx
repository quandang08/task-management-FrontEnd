import React from "react";
import TaskCard from "./TaskCard";

const TaskList = () => {
  return (
    <div className="space-y-5 w-[67%]">
      <div className="space-y-3">
        {[1, 1, 1, 1, 1, 1].map((item, index) => (
          <TaskCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
