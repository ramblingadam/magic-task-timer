// Hooks
import { useState } from 'react'
// Components

// Styles
import './Header.css'
// Icons
import { MdAddCircle, MdSettings } from "react-icons/md"

const Header = () => {


  const [showNewTaskForm, setShowNewTaskForm] = useState(false)

  const toggleNewTaskForm = () => {
    showNewTaskForm ? setShowNewTaskForm(false) : setShowNewTaskForm(true)
    console.log('we addin')
  }

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      name: document.getElementById('task-name').value,
      time: 0
    }

    console.log(newTask)
    // Check if tasks object already exists in localStorage.
    if(localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks')).concat(newTask)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
      const tasks = [
        newTask
      ]
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  return (
    <div className='header-wrapper'>
      <div className='header-main'>
        <h1>Project Tracker</h1>
        <div className='header-buttons'>
          <MdAddCircle onClick={toggleNewTaskForm} />
          <MdSettings />
          {/* <NewTaskButton onClick={createNewTask}/> */}
          {/* <SettingsButton /> */}
        </div>
      </div>
      {showNewTaskForm &&
      <div className='new-task-form'>
        <input id='task-name' type="text" placeholder="Task Name"/>
        <button onClick={addNewTask}>Add</button>
      </div>
      }
    </div>
  )
}

export default Header
