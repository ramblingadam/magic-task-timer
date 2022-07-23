// Hooks
import { useState } from "react"
import { useEffect } from "react"
// Components
import AddTime from "../AddTime/AddTime"
import Button from '../Button/Button'
// Style
import './Task.css'
// Icons
import { MdEdit, MdDelete, MdAvTimer, MdHistoryEdu, MdHistory, MdHistoryToggleOff, MdExpandLess, MdExpandMore } from "react-icons/md"

const Task = (props) => {

  //! Pieces of State
  // Timer Stuff
  const [timerRunning, setTimerRunning] = useState(false)
  // TODO NEW TOTAL TIME
  const [totalTime, setTotalTime] = useState((props.task.dates.reduce( (acc, date) => acc + date.time, 0)))
  const [startTime, setStartTime] = useState(null)

  // TODO store current time of ticking timer only, NOT including previous time in task
  const [runningTime, setRunningTime] = useState(0)

  // Add Time Form stuff
  const [showAddTimeForm, setShowAddTimeForm] = useState(false)
  const [addTimeFormCollapsed, setAddTimeFormCollapsed] = useState(true)

  // Track animation completion to determine reveal/revealed or hide/hidden class on task form
  const [addTimeFormAnimationDone, setAddTimeFormAnimationDone] = useState(true)

  // TODO Window Resizing for tiem display
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

    // TODO store running time
    setRunningTime(Date.now() - startTime)

    setStartTime(Date.now())
  }

  // // Task object updater - localStorage
  // TODO THE TIME PARAMETER AAAHH
  const updateTask = (name, time, date) => {
    // Copy current task. We will modify this copy with the requested changes before injecting it back into the database.
    const updatedTask = props.task
    
    // If a valid time passed in, update time for selected date OR today.
    // In other words- if ONLY a new name is passed in, skip the following and just update the name.
    if(time && time > 0) {
    

      // TODO ADD TIME TO CURRENT DAY
      // Get current date
      const now = new Date()
      const year = now.getFullYear()
      let month = now.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let day = now.getDate()
      day = day >= 10 ? day : '0' + day
      const today = `${year}-${month}-${day}`

  

      // If no date passed in, default to today
      if(!date) date = today

      const currentDateIndex = updatedTask.dates.findIndex(dateEntry => dateEntry.date === date)
      if(currentDateIndex === -1) {
        updatedTask.dates.push({date: date, time: time})
      } else {
        updatedTask.dates[currentDateIndex].time += time
      }
    }
    // Only update name if a name is passed in.
    if(name) updatedTask.name = name

    setTotalTime(props.task.dates.reduce( (acc, date) => acc + date.time, 0))
    // Grab tasks from localStorage, and replace current task with updatedTask.
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    props.renderAll() // Re-render app so user can see changes.
  }

  // TODO SUM TIME FROM ALL DATES HELPER
  const sumTimeFromAllDates = () => {
    return props.task.dates.reduce( (acc, date) => acc + date.time, 0)
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
      // TODO New Running Time addition
      console.log(runningTime)
      updateTask(undefined, runningTime)

    }
  }


  //// Delete Task
  const deleteTask = () => {
    if(window.confirm(`Are you sure you want to delete ${props.task.name}?`)) {
      // Grab tasks from localStorage and delete current task.
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      // Reassign sort order for all items occuring AFTER current item by moving them all up one position (position -1)
      tasks.forEach(task => {
        if(task.sortPosition > props.task.sortPosition) task.sortPosition -= 1
      })
      // Delete current task.
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

    updateTask(newName)
  }


  //// Show "Add/Subtract/Set" Time Form
  const toggleAddTimeForm = () => {
    setAddTimeFormAnimationDone(false)
    if(timerRunning) return
    if(addTimeFormCollapsed) {
      setTimeout(() => {
        // Trigger swapping hide animation CSS class with hidden static CSS class.
        setAddTimeFormCollapsed(false)
        setAddTimeFormAnimationDone(true)
      }, 601)
    } else {
      setTimeout(() => {
        // Trigger swapping reveal animation CSS class with revealed static CSS class.
        setAddTimeFormCollapsed(true)
        setAddTimeFormAnimationDone(true)
      }, 601)
    }
    setShowAddTimeForm(!showAddTimeForm)
  }

  //// Task Reordering
  const reorder = direction => {
    // Store current task position. (redundant...)
    const currentTaskPosition = props.task.sortPosition

    // First, grab all tasks.
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    if(direction === 'up') { // If we are sorting the task up...
      // ...then change current tasks position by -1 (moving it up the list)
      // ...and change the task directly above the current tasks position by +1 (moving it down)
      tasks.forEach(task => {
        if(task.sortPosition === currentTaskPosition) {
          task.sortPosition -= 1
        } else if (task.sortPosition === currentTaskPosition - 1) {
          task.sortPosition += 1
        }
      })
    } else if(direction === 'down') { //If sorting down, do the opposite of above...
      // ...by changing current tasks position by +1 (moving it down one slot)
      // ...and changing the task directly below the current tasks position by -1 (moving it up)
      tasks.forEach(task => {
        if(task.sortPosition === currentTaskPosition) {
          task.sortPosition += 1
        } else if (task.sortPosition === currentTaskPosition + 1) {
          task.sortPosition -= 1
        }
      })
    }
    // Store new order in storage/DB.
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // Re-render Tasks so that new order is instantly visible.
    props.renderAll()
  }


  //! Component
  return (
    <li className={`task ${timerRunning ? 'running' : ''}`}>
      <div className='task-name text-shadow'>
        <p>{props.task.name}</p>
        <div className='icon-buttons'>
          <MdHistoryToggleOff className={`edit-time-btn ${timerRunning ? 'disabled' : ''} ${showAddTimeForm ? 'edit-time-btn-form-visible' : ''}`} onClick={toggleAddTimeForm}/>
          <MdEdit className="edit-btn" onClick={editTask}/>
          <MdDelete className="delete-btn" onClick={deleteTask}/>
        </div>
      </div>

      <div className='task-info'>
        <div className='sort-btns'>
          <MdExpandLess className='sort-btn' onClick={props.task.sortPosition > 1 ? () => reorder('up') : null}/>
          <MdExpandMore className='sort-btn' onClick={props.task.sortPosition < JSON.parse(localStorage.getItem('tasks')).length ? () => reorder('down') : null}/>
         </div>
        <div className='task-time text-shadow'>
          <p>{convertTime(totalTime)}</p>
        </div>
        <div className='task-buttons'>
          <button className={`task-btn btn ${timerRunning ? 'running' : ''}`} onClick={toggleTimer}>
            {timerRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* <div className={`slide-able ${showAddTimeForm ? 'reveal' : addTimeFormCollapsed ? 'hidden' : 'collapse'}`}> */}
      <div className={`slide-able ${showAddTimeForm && !addTimeFormAnimationDone ? 'reveal' : showAddTimeForm ? 'revealed' : addTimeFormCollapsed || (!showAddTimeForm && addTimeFormAnimationDone) ? 'hidden' : 'collapse'}`}>
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
