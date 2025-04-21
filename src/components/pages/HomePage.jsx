import React, { useEffect } from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import TaskList from '../tasks/TaskList';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../features/task/TaskThunk';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  return (
    <div className="lg:flex px-5 lg:px-20 pt-[2.9vh]">
      <div>
        <Sidebar />
      </div>

      <div className="right-side-part w-full flex justify-center mb-10">
        <TaskList />
      </div>
    </div>
  );
};

export default HomePage;
