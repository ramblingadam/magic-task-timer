import React from 'react'
import Task from '../Task/Task'

const Tasks = ({renderAll}) => {

  const tasks = JSON.parse(localStorage.getItem('tasks'))
  console.log(tasks)
  return (
    <div className='tasks'>
      <ul>
        {tasks.length >= 1 ? tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            renderAll={renderAll}
          />
        ))
      : <p className='add-task-msg'>Click the + button to add a project to track.</p>}
      </ul>
    </div>
  )
}

export default Tasks
