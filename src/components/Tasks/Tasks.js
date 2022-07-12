import React from 'react'
import Task from '../Task/Task'

const Tasks = () => {

  const tasks = JSON.parse(localStorage.getItem('tasks'))

  return (
    <div>
      <ul>
        {tasks && tasks.map(task => (
          <Task
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </div>
  )
}

export default Tasks
