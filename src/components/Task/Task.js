// Hooks
import { useState } from "react"
import { useEffect } from "react"
// Components
import AddTime from "../AddTime/AddTime"
import Button from '../Button/Button'
// Style
import './Task.css'
// Icons
import { MdEdit, MdDelete, MdAvTimer, MdHistoryEdu, MdHistory, MdHistoryToggleOff } from "react-icons/md"

const Task = (props) => {

  //! Pieces of State
  // Timer Stuff
  const [timerRunning, setTimerRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(props.task.time)
  const [startTime, setStartTime] = useState(null)
  // Add Time Form stuff
  const [showAddTimeForm, setShowAddTimeForm] = useState(false)
  const [addTimeFormCollapsed, setAddTimeFormCollapsed] = useState(true)
  // Window Resizing
  const [screenWidth, setScreenWidth] = useState()

  const getScreenWidth = () => {
    const { innerWidth } = window
    return innerWidth
  }




  //! Helper Functions
  //// Converts ms into a a string with hrs, mins, secs
  const convertTime = ms => {
    let seconds = Math.round(ms / 1000)
    let minutes = 0
    let hours = 0
    let days = 0
    while(seconds >= 60) {
      minutes += 1
      seconds -= 60
    }
    while(minutes >= 60) {
      hours += 1
      minutes -= 60
    }
    // while(hours >= 24) {
    //   days += 1
    //   hours -= 24
    // }
    // return `${days ? days + 'days : ' : ''} ${hours}hrs : ${minutes}mins : ${seconds}secs`

    const width = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    const short = width < 700 ? true : false
    // return `${hours}hrs : ${minutes}mins : ${seconds}secs`
    return `${hours}h : ${minutes}m : ${seconds}s`
  }

  //// Visual time update functions
  useEffect(() => {
    // console.log('component is born!')
    let interval = null
    if(timerRunning) {
      interval = setInterval(() => {updateTime()}, 1000)
    }
    else if(!timerRunning) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

  const updateTime = () => {
    setTotalTime(totalTime + (Date.now() - startTime))
    setStartTime(Date.now())
  }

  // // Task object updater - localStorage
  const updateTask = (name = props.task.name, time = props.task.time) => {
    // If time is less than 0, set to 0.
    if(time < 0) time = 0

    // Copy current task, then re-assign time and/or name as appropriate
    const updatedTask = props.task
    updatedTask.time = time
    updatedTask.name = name
    setTotalTime(updatedTask.time)
    // Grab tasks from localStorage, and replace current task with updatedTask.
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    props.renderAll()
  }

  //// Timer function
  const toggleTimer = async () => {


    // If timer is NOT currently running:
    if(!timerRunning) {
      setTimerRunning(true)     
      setStartTime(Date.now())
      setShowAddTimeForm(false)

    // If Timer IS currently running:
    } else { 
      setTimerRunning(false)
      updateTask(undefined, totalTime)
    }
  }


  //// Delete Task
  const deleteTask = () => {
    if(window.confirm(`Are you sure you want to delete ${props.task.name}?`)) {
      // Grab tasks from localStorage and delete current task.
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      props.renderAll() // Re-render app.
    }
  }

  //// Edit Task
  const editTask = () => {

    const newName = window.prompt('Enter new task name.', props.task.name)
    // User passes in any empty string. Warn, and exit without updating.
    if(newName === '') {
      alert('Task name cannot be blank.')
      return
    }
    // User presses cancel, setting newName to null. Exit without updating.
    if(newName === null){
      return
    }

    updateTask(newName, undefined)
  }


  //// Show "Add/Subtract/Set" Time Form
  const toggleAddTimeForm = () => {
    if(timerRunning) return
    if(addTimeFormCollapsed) {
      setTimeout(() => {
        setAddTimeFormCollapsed(false)
      }, 700)
    }
    setShowAddTimeForm(!showAddTimeForm)
  }


  //! Component
  return (
    <li className={`task ${timerRunning ? 'running' : ''}`}>
      <div className='task-name text-shadow'>
        <p>{props.task.name}</p>
        <div className='icon-buttons'>
          <MdHistoryToggleOff className={`edit-time-btn ${timerRunning ? 'disabled' : ''} ${showAddTimeForm ? 'edit-time-btn-form-visible' : ''}`} onClick={toggleAddTimeForm}/>
          {/* <MdHistory />
          <MdHistoryEdu />
          <MdAvTimer /> */}
          <MdEdit className="edit-btn" onClick={editTask}/>
          <MdDelete className="delete-btn" onClick={deleteTask}/>
        </div>
      </div>

      <div className='task-info'>
        <div className='task-time text-shadow'>
          <p>{convertTime(totalTime)}</p>
        </div>
        <div className='task-buttons'>
          {/* <button className={`edit-time-btn btn ${timerRunning ? 'disabled' : ''}`} onClick={toggleAddTimeForm}>Edit Time</button> */}
          <button className={`task-btn btn ${timerRunning ? 'running' : ''}`} onClick={toggleTimer}>{timerRunning ? 'Stop' : 'Start'}</button>
        </div>
      </div>

      <div className={`add-time slide-able ${showAddTimeForm ? 'reveal' : addTimeFormCollapsed ? 'hidden' : 'collapse'}`}>
      <AddTime
        task={props.task}
        updateTask={updateTask}
        toggleAddTimeForm={toggleAddTimeForm}
      />
      </div>
    </li>
  )
}

export default Task
