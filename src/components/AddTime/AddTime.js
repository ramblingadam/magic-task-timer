import './AddTime.css'
import { useState } from 'react'

const AddTime = (props) => {

  // //// Pieces Of State
  // const [hoursToAdd, setHoursToAdd] = useState(0)
  // const [minsToAdd, setMinsToAdd] = useState(0)


  // const addHours = document.getElementById('add-hours')
  // const addMinutes = document.getElementById('add-minutes')

  console.log('props',props)

  const addTime = (e) => {
    e.preventDefault()
    const addHours = document.getElementById('add-hours')
    const addMinutes = document.getElementById('add-minutes')
    console.log(e)
    console.log('hours val?', e.target[0].value, e.target[0].value * 60)
    console.log('mins val?', e.target[1].value)
    const hours = +e.target[0].value > 0 ? +e.target[0].value : 0
    const mins = +e.target[1].value > 0 ? +e.target[1].value : 0
    const minutesToAdd = Math.floor(hours * 60) + mins
    const timeToAdd = minutesToAdd * 60000
    console.log('current prop and time:', props.task.name, props.task.time)
    console.log('want to add:', timeToAdd)
    props.updateTask(undefined, props.task.time + timeToAdd)
    // const updatedTask = props.task
    // updatedTask.time += timeToAdd

    // // Grab tasks from localStorage, and replace current task with updatedTask.
    // const tasks = JSON.parse(localStorage.getItem('tasks'))
    // console.log('here be tasks', tasks)

    // tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)
    // localStorage.setItem('tasks', JSON.stringify(tasks))
    // console.log('updated tasks???', tasks)
    console.log(props.renderAll)
    props.renderAll()
    console.log('did we rerender?')
  }


  return (
    <div className="add-time">
      <h1>Add Time:</h1>
      <form onSubmit={addTime}>
        <div>
          <label><span>Hours</span>
            <input type="number" id="add-hours"/>
          </label>
          <label><span>Minutes</span>
            <input type="number" id="add-minutes"/>
          </label>
        </div>
        <button>Add Time</button>
      </form>
    </div>
  )
}

export default AddTime