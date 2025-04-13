import React from 'react'
import Sidebar from '../layout/Sidebar/Sidebar'
import TaskList from '../tasks/TaskList'

const HomePage = () => {
  return (
    <div className="lg:flex px-5 lg:px-20 pt-[2.9vh]">
        <div >
            <Sidebar/>
        </div>

        <div className="right-side-part w-full flex justify-center mb-10">
            <TaskList/>
        </div>
    </div>
  )
}

export default HomePage