// State
import { useState } from 'react'
// Styles
import './AddTime.css'
// Icons
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

const AddTime = (props) => {

  // //// Pieces Of State
  const [hoursToAdd, setHoursToAdd] = useState('')
  const [minutesToAdd, setMinutesToAdd] = useState('')
  // const [addOrSubtract, setAddOrSubtract] = useState(true)

  // console.log('props',props)

  const handleTimeChange = (denomination, e) => {
    const value = +e.target.value
    if(denomination === 'hours') {
      setHoursToAdd(+value > 0 ? +value : '')
    }
    if(denomination === 'mins') {
      setMinutesToAdd(+value > 0 ? +value : '')
    }
  }

  const updateTime = (operation) => {
    const totalTimeInput = ((hoursToAdd * 60) + minutesToAdd) * 60000
    if(operation === 'add') {
      props.updateTask(undefined, props.task.time + totalTimeInput)
    }
    if(operation === 'subtract') {
      props.updateTask(undefined, props.task.time - totalTimeInput)
    }
    if(operation === 'set') {
      if(window.confirm('Really overwrite the total time spent on this task? This is not reversible.')) {
        props.updateTask(undefined, totalTimeInput)
      }
    }
    setHoursToAdd('')
    setMinutesToAdd('')
  }

  return (
    <div className="add-time">
      <form>
        <div>
          <label><span>Hours</span>
            <input type="number" id="add-hours" value={hoursToAdd} onChange={(e) => handleTimeChange('hours', e)}/>
          </label>
          <label><span>Minutes</span>
            <input type="number" id="add-minutes" value={minutesToAdd} onChange={(e) => handleTimeChange('mins', e)}/>
          </label>
        </div>
        <div className='add-subtract-btns'>
          <MdRemoveCircle id='remove-time' onClick={() => updateTime('subtract')}/>
          <p id='' onClick={() => updateTime('set')}>SET</p>
          <MdAddCircle onClick={() => updateTime('add')}/>
        </div>
      </form>
    </div>
  )
}

export default AddTime