// Hooks
import { useState } from "react"
import { useEffect } from "react"
// Style
import './Task.css'
// Icons
import { MdEdit, MdDelete } from "react-icons/md"

const Task = (props) => {

  //! Pieces of State
  const [timerRunning, setTimerRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(props.task.time)
  const [startTime, setStartTime] = useState(null)
  const [interval, setIntervalState] = useState(null)

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
    while(hours >= 24) {
      days += 1
      hours -= 24
    }
    return `${days ? days + 'days : ' : ''} ${hours}hrs : ${minutes}mins : ${seconds}secs`
  }

  // TODO Visual time update function
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

  const updateTask = (name = props.task.name, time = props.task.time) => {
    const updatedTask = props.task
    updatedTask.time = time
    updatedTask.name = name
    // console.log('updated task:', updatedTask)

    const tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // console.log(`new storage:`, JSON.parse(localStorage.getItem('tasks')))
  }

  //// Timer function
  const toggleTimer = async () => {


    // If timer is NOT currently running:
    if(!timerRunning) {
      setTimerRunning(true)     
      setStartTime(Date.now())

    // If Timer IS currently running:
    } else { 
      // const duration = Date.now() - startTime
      // const newTotal = totalTime + duration
      // setTotalTime(newTotal)
      setTimerRunning(false)
      updateTask(undefined, totalTime)
    }
  }


  //// Delete Task
  const deleteTask = () => {
    if(window.confirm(`Are you sure you want to delete ${props.task.name}?`)) {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    props.renderAll()
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

    // Refresh tasks window.
    props.renderAll()
  }

  //! Component
  return (
    <li className={`task ${timerRunning ? 'running' : ''}`}>
      <div className='task-name text-shadow'>
        <p>{props.task.name}</p>
        <div className='edit-buttons'>
          <MdEdit className="edit-btn" onClick={editTask}/>
          <MdDelete className="delete-btn" onClick={deleteTask}/>
        </div>
      </div>
      <div className='task-info'>
        <div className='task-time text-shadow'>
          <p>{convertTime(totalTime)}</p>
        </div>
        <div className='task-buttons'>
          <button className={`task-btn ${timerRunning ? 'running' : ''}`} onClick={toggleTimer}>{timerRunning ? 'Stop' : 'Start'}</button>
          {/* <button>Delete</button> */}
        </div>
      </div>
    </li>
  )
}

export default Task
