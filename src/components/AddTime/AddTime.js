// State
import { useState, useEffect } from 'react'
// Styles
import './AddTime.css'
// Icons
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

const AddTime = (props) => {

  // ! Pieces Of State
  const [hoursToAdd, setHoursToAdd] = useState('')
  const [minutesToAdd, setMinutesToAdd] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  useEffect(() => setDateInForm('today'), [selectedDate])

  // ! Helper Functions
  // // Manage Controlled Time and Date Inputs
  const handleTimeChange = (denomination, e) => {
    console.log(e)
    const value = +e.target.value
    if(denomination === 'hours') {
      setHoursToAdd(+value > 0 ? +value : '')
    }
    if(denomination === 'mins') {
      setMinutesToAdd(+value > 0 ? +value : '')
    }
    if(denomination === 'date') {
      // console.log('we are in the date')
      // setSelectedDate(value)
    }
  }



  // // Subtract, Set, or Add the time entered into the time form
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
    props.toggleAddTimeForm()
  }



  // // Set date
  const setDateInForm = specificDate => {
    // If this functioni s called by state intialization, set date to today.
    if(specificDate = 'today') {
      const today = new Date()
      const year = today.getFullYear()
      let month = today.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let day = today.getDate()
      day = day >= 10 ? day : '0' + day
      const parsedDate = `${year}-${month}-${day}`
      setSelectedDate(parsedDate)
    } else {
      // setSelectedDate
    }
  }



  // ! Component
  return (
    <div className="add-time">
      <form>
        <p>Enter a number of hours and/or minutes, then press <span className='red'>Subtract</span>, <span className='yellow'>Set</span>, or <span className='green'>Add</span> to adjust the total time for the specified date.</p>
        <div>
          <label><span className='heading'>Date</span>
            <input type="date" id="choose-date" value={selectedDate} onChange={(e) => handleTimeChange('date', e)}/>
          </label>
          <label><span className='heading'>Hours</span>
            <input type="number" id="add-hours" value={hoursToAdd} onChange={(e) => handleTimeChange('hours', e)}/>
          </label>
          <label><span className='heading'>Minutes</span>
            <input type="number" id="add-minutes" value={minutesToAdd} onChange={(e) => handleTimeChange('mins', e)}/>
          </label>
        </div>
        <div className='add-subtract-btns'>
          <MdRemoveCircle id='subtract-time' className='time-edit-btn' onClick={() => updateTime('subtract')}/>
          <p id='set-time' className='time-edit-btn yellow'onClick={() => updateTime('set')}>SET</p>
          <MdAddCircle id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/>
        </div>
      </form>
    </div>
  )
}

export default AddTime