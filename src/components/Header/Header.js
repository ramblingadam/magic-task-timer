// Hooks
import { useState } from 'react'
// Components

// Styles
import './Header.css'

// Icons
import { MdAddCircle, MdSettings, Mddashci } from "react-icons/md"

const Header = ({renderAll}) => {

  //// Pieces of State ////
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [taskFormCollapsed, setTaskFormCollapsed] = useState(true)

  //// Helper Functions /////
  //// Toggles visibility of New Task Form
  const toggleNewTaskForm = () => {

    // Check if task form already visible.
    if(showNewTaskForm) {  // If it is visible, hide it and revert icon to a '+'

      // Trigger collapse slide-out/fade-out & plus button animations.
      setShowNewTaskForm(false)

      // Waits for task form collapse animation to finish (.6s), then set collapsed state to apply .hidden class to form.
      // setTimeout( () => {
      //   setTaskFormCollapsed(true)
      // }, 700)
    } else {        // If it's not visible, show it and change icon to a 'x'

      // Change TaskFormCollpased state to remove .hidden class from form.
      setTaskFormCollapsed(false) 

      // Clear the input of any detritus left over from last non-entered input.
      document.getElementById('task-name').value = ''

      // Trigger reveal slide-in/fade-in & plus button animations.
      setShowNewTaskForm(true)

      // Focus user cursor into task name field.
      document.getElementById('task-name').focus() 
    }
  }

  //// Adds a new task
  const addNewTask = (e) => {
    e.preventDefault() // Prevent page reload on form submit.

    // Grab value from user.
    const taskInput = document.getElementById('task-name').value

    // Clear input field.
    document.getElementById('task-name').value = ''

     // Input validation
    if(!taskInput) {
      alert('Task name cannot be blank.')
      return
    }
   
    // create new task object
    const newTask = {
      id: Date.now(),
      name: taskInput,
      time: 0
    }

    // Check if tasks cache already exists in localStorage.
    if(localStorage.getItem('tasks')) { //If so, grab cache, add new task, and re-set into localStorage.
      const tasks = JSON.parse(localStorage.getItem('tasks')).concat(newTask)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } else { // If not, start the tasks cache from scratch.
      const tasks = [
        newTask
      ]
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    renderAll() // Re-renders App.js, which re-renders Tasks.js, so that the newly added task shows up right away.
  }

  //// Component ////
  return (
    <div className='header-wrapper'>
      <div className='header-main text-shadow'>
        <h1>Project Tracker&nbsp;<MdAddCircle className={`plus ${showNewTaskForm ? 'open' : ''}`} onClick={toggleNewTaskForm} /></h1>
        
        <div className='header-buttons'>
          
          <MdSettings />
        </div>
      </div>
      <div className={`new-task-form slide-able ${showNewTaskForm ? 'reveal' : taskFormCollapsed ? 'hidden' : 'collapse'} `}>
        <form action="">
          <input onSubmit={addNewTask} id='task-name' type="text" placeholder="Task Name"/>
          <button onClick={addNewTask} id='add-task-btn'>Add Task</button>
        </form>
      </div>
    </div>
  )
}

export default Header
