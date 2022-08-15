// Hooks
import { useState } from 'react'
// Components
import Settings from '../Settings/Settings'
// Styles
import './Header.css'

// Icons
import { MdAddCircle, MdSettings, Mddashci, MdHelp, MdQuestionAnswer, MdHelpOutline, MdHelpCenter } from "react-icons/md"

const Header = ({renderAll, changeTheme, toggleSettingsMenu, globalCurrentCategory}) => {

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

    // Get current date to store as date created in new task
    const now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = now.getDate()
    day = day >= 10 ? day : '0' + day
    const today = `${year}-${month}-${day}`

    // Set sort position to put new task on top by decreasing sort position of all other tasks
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

    const newTaskCategory = globalCurrentCategory === 'All' || globalCurrentCategory === 'Uncategorized' ? '' : globalCurrentCategory

    tasks.forEach(task => {
      task.sortPosition += 1
    })
    tasks.filter(task => task.category === newTaskCategory).forEach(task => {
      task.categorySort += 1
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
   
    // create new task object
    const newTask = {
      id: Date.now(),
      name: taskInput,

      category: newTaskCategory,
      categorySort: 1,
      sortPosition: 1,
      dates: [
        // {date: '2022-10-20', time: 45670},
        // {date: '2022-10-22', time: 23045},
      ],
      created: today,
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



  //! Component 
  return (
    <div className='header-wrapper'>
      
      <div className='header-main text-shadow'>
        <h1>Magic Task Timer&nbsp;<MdAddCircle className={`plus ${showNewTaskForm ? 'open' : ''}`} onClick={toggleNewTaskForm} /></h1>
        
        <div className='header-buttons'>
          <MdHelpOutline className='edit-btn'/>
          {/* <MdHelpCenter />
          <MdQuestionAnswer />
          <MdHelp /> */}
          <MdSettings className='settings-btn' onClick={toggleSettingsMenu}/>
          
        </div>
      </div>
      <div className={`new-task-form slide-able ${showNewTaskForm ? 'reveal-small' : taskFormCollapsed ? 'hidden' : 'collapse-small'} `}>
        <form action="">
          <input onSubmit={addNewTask} id='task-name' type="text" placeholder="Task Name"/>
          <button onClick={addNewTask} id='add-task-btn'>Add Task</button>
        </form>
      </div>
    </div>
  )
}

export default Header
