import { useState } from "react"

const Task = (props) => {
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

  const [timerRunning, setTimerRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(props.task.time)
  const [startTime, setStartTime] = useState(null)

  let duration

  // Timer function
  const toggleTimer = () => {

    // If timer is NOT currently running:
    if(!timerRunning) {
      setTimerRunning(true)

      setStartTime(Date.now())
      console.log('start', startTime)

      // If Timer IS currently running:
    } else { 
      duration = Date.now() - startTime
      const newTotal = totalTime + duration
      setTotalTime(newTotal)
      setTimerRunning(false)

      const updatedTask = props.task
      updatedTask.time = newTotal
      console.log('updated task:', updatedTask)

      const tasks = JSON.parse(localStorage.getItem('tasks'))

      tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)

      localStorage.setItem('tasks', JSON.stringify(tasks))

      console.log('localstorage: ', JSON.parse(localStorage.getItem('tasks')))
    }
 

  }


  return (
    <li>
      <div className='task-name'>
        Task: {props.task.name}
      </div>
      <div className='task-time'>
        Total Time Spent: {convertTime(totalTime)}
      </div>
      <div className='task-buttons'>
        <button onClick={toggleTimer}>{timerRunning ? 'Stop' : 'Start'}</button>
      </div>
    </li>
  )
}

export default Task
