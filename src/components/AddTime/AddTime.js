// State
import { useState } from 'react'
// Styles
import './AddTime.css'
// Icons
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

const AddTime = (props) => {

  // //// Pieces Of State
  // const [hoursToAdd, setHoursToAdd] = useState(0)
  // const [minsToAdd, setMinsToAdd] = useState(0)
  const [addOrSubtract, setAddOrSubtract] = useState(true)

  const addHours = document.getElementById('add-hours')
  const addMinutes = document.getElementById('add-minutes')

  console.log('props',props)

  const addTime = (e) => {
    e.preventDefault()
    document.getElementById('add-hours').value = ''
    document.getElementById('add-minutes').value = ''
    // console.log(e)
    console.log('hours val?', +e.target[0].value, e.target[0].value * 60)
    console.log('mins val?', +e.target[1].value)
    const hours = +e.target[0].value > 0 ? +e.target[0].value : 0
    const mins = +e.target[1].value > 0 ? +e.target[1].value : 0
    const minutesToAdd = Math.floor(hours * 60) + mins
    const timeToAdd = minutesToAdd * 60000
    console.log('current prop and time:', props.task.name, props.task.time)
    console.log('want to add:', timeToAdd)
    props.updateTask(undefined, props.task.time + timeToAdd)
    document.getElementById('add-hours').value = ''
    document.getElementById('add-minutes').value = ''
  
  }

  return (
    <div className="add-time">
      {/* <div className='add-subtract-btn'>
        {addOrSubtract ?
        <MdAddCircle />
        :
        <MdRemoveCircle />}
      </div> */}
      <form onSubmit={addTime}>
        <div>
          <label><span>Hours</span>
            <input type="number" id="add-hours" />
          </label>
          <label><span>Minutes</span>
            <input type="number" id="add-minutes" />
          </label>
        </div>
        <div className='add-subtract-btns'>
          <button>Add Time</button>
          <button>Subtract Time</button>
          <MdRemoveCircle />
          {/* <p>SET</p> */}
          <MdAddCircle />
        </div>
      </form>
    </div>
  )
}

export default AddTime