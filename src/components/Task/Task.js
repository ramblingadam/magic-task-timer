// Hooks
import { useState } from "react"
// Style
import './Task.css'
// Icons
import { MdEdit, MdDelete } from "react-icons/md"

const Task = (props) => {

  //// Pieces of State
  const [timerRunning, setTimerRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(props.task.time)
  const [startTime, setStartTime] = useState(null)

  //// Helper Functions
  // Converts ms into a a string with hrs, mins, secs
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
  const updateTime = async () => {
    while(timerRunning) {

    }
  }

  // Timer function
  const toggleTimer = () => {

    // If timer is NOT currently running:
    if(!timerRunning) {
      setTimerRunning(true)
      setStartTime(Date.now())

    // If Timer IS currently running:
    } else { 
      const duration = Date.now() - startTime
      const newTotal = totalTime + duration
      setTotalTime(newTotal)
      setTimerRunning(false)

      const updatedTask = props.task
      updatedTask.time = newTotal
      console.log('updated task:', updatedTask)

      const tasks = JSON.parse(localStorage.getItem('tasks'))

      tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)

      localStorage.setItem('tasks', JSON.stringify(tasks))

      // console.log('localstorage: ', JSON.parse(localStorage.getItem('tasks')))
    }
  }


  // Delete Task
  const deleteTask = () => {
    if(window.confirm(`Are you sure you want to delete ${props.task.name}?`)) {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    props.renderAll()
    }
  }

  //// Component
  return (
    <li className="task">
      <div className='task-name'>
        <p>{props.task.name}</p>
        <div className='edit-buttons'>
          <MdEdit className="edit-btn"/>
          <MdDelete className="delete-btn" onClick={deleteTask}/>
        </div>
      </div>
      <div className='task-info'>
        <div className='task-time'>
          <p>Total: {convertTime(totalTime)}</p>
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
