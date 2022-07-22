import React from 'react'
import Task from '../Task/Task'

const Tasks = ({renderAll}) => {

  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
  console.log(tasks)
  return (
    <div className='tasks'>
      <ul>
        {tasks.length >= 1 ? tasks.sort( (a, b) => a.sortPosition - b.sortPosition).map(task => (
          <Task
            key={task.id}
            task={task}
            renderAll={renderAll}
          />
        ))
      : <p className='add-task-msg'>Click the + button to add a task!</p>}
      </ul>
    </div>
  )
}

export default Tasks
