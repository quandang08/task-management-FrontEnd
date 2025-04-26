import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskList from '../tasks/TaskList';
import { fetchTasks } from '../../features/task/TaskThunk';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  return (
    <div className="px-5 lg:px-20 pt-[2.9vh] w-full">
      <TaskList />
    </div>
  );
};

export default HomePage;
