// Components
import Heatmap from '../Heatmap/Heatmap'
import History from '../History/History'
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
  const [today, setToday] = useState('')

  const [dateInputFlash, setDateInputFlash] = useState(false)



  // Set today as the default date in the add time form.
  useEffect(() => {
    const today = props.getToday()
    if(selectedDate > today || selectedDate === '') setDateInForm('today')
  }, [selectedDate])

  // ! Helper Functions
  // // Manage Controlled Time and Date Inputs
  const handleTimeChange = (denomination, e) => {
    // console.log(e)
    const value = +e.target.value
    if(denomination === 'hours') {
      setHoursToAdd(+value > 0 ? +value : '')
    }
    if(denomination === 'mins') {
      setMinutesToAdd(+value > 0 ? +value : '')
    }
    if(denomination === 'date') {
      // console.log('we are in the date')
      setSelectedDate(e.target.value)
    }
  }

  

  // // Subtract, Set, or Add the time entered into the time form
  const updateTime = (operation, date) => {
    const totalTimeInput = ((hoursToAdd * 60) + minutesToAdd) * 60000
    if(totalTimeInput === 0) return
    const selectedDateOldTime = props.task.dates[props.task.dates.findIndex(date => date.date === selectedDate)]?.time
    console.log('prev time', selectedDateOldTime, 'time input', totalTimeInput, 'new total', selectedDateOldTime + totalTimeInput)
    // console.log(selectedDateOldTime)

    if(operation === 'add') {
      // If selected date exists, add value to old value. Otherwise, initialize with entered time.
      props.updateTask(undefined, selectedDateOldTime ? selectedDateOldTime + totalTimeInput : totalTimeInput, selectedDate)
    }
    if(operation === 'subtract') {
      // If selected date exists, subtract input value from old value. If it doesn't exist, ignore.
      if(selectedDateOldTime) {
        props.updateTask(undefined, selectedDateOldTime - totalTimeInput, selectedDate)
      }
    }
    if(operation === 'set') {
      // If a time already exists for selected date, have user confirm overwrite. Otherwise, set time for selected date without confirmation.
      if(selectedDateOldTime) {
        if(window.confirm(`Really overwrite the time spent on '${props.task.name}' for the date ${selectedDate}? This is not reversible.`)) {
          props.updateTask(undefined, totalTimeInput, selectedDate)
        }
      } else props.updateTask(undefined, totalTimeInput, selectedDate)
    }
    // Reset Time Form states on submission.
    setHoursToAdd('')
    setMinutesToAdd('')
    
    // TODO Set dat back to today by default.... maybe not have this?
    // setDateInForm('today')

    // Hide form on entry of anything.
    // props.toggleAddTimeForm()
  }



  // // Set date
  const setDateInForm = specificDate => {
    // If this function is called by state intialization, set date to today.
    if(specificDate === 'today') {
      const today = props.getToday()
      setSelectedDate(today)
      setToday(today)
    } else {
      setSelectedDate(specificDate)
    }
    setDateInputFlash(true)
    setTimeout(() => setDateInputFlash(false), 1000)
  }


  



  // ! Component
  return (
    <div className="add-time">

      <div className='add-time-instructions'>
          <p>Select a date from the heatmap or the history table.</p>
          <p> Then, press <span className='red'>Subtract</span>, <span className='yellow'>Set</span>, or <span className='green'>Add</span> to adjust the time for the selected date.</p>
        </div>
        
      <form>
        <div>
          {/* Date Input */}
          <label className={`${dateInputFlash ? 'flash' : ''}`}><span className='heading'>Date</span>
            <input type="date" id="choose-date"  value={selectedDate} max={today} onChange={(e) => handleTimeChange('date', e)}/>
          </label>
          {/* Hours Input */}
          <label><span className='heading'>Hours</span>
            <input type="number" id="add-hours" value={hoursToAdd} onChange={(e) => handleTimeChange('hours', e)}/>
          </label>
          {/* Minutes Input */}
          <label><span className='heading'>Minutes</span>
            <input type="number" id="add-minutes" value={minutesToAdd} onChange={(e) => handleTimeChange('mins', e)}/>
          </label>
        </div>
        <div className='add-subtract-btns'>
          <MdRemoveCircle id='subtract-time' className='time-edit-btn' onClick={() => updateTime('subtract')}/>
          <p id='set-time' className='time-edit-btn yellow'onClick={() => updateTime('set', selectedDate)}>SET</p>
          <MdAddCircle id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/>
        </div>
      </form>

      {/* //// Task History Heatmap */}
      <Heatmap
        convertTime={props.convertTime}
        task={props.task}
        setDateInForm={setDateInForm}
      />

      {/* //// Task History Table*/}
      <History
        task={props.task}
        convertTime={props.convertTime}
        setDateInForm={setDateInForm}
      />

      

    </div>
  )
}

export default AddTime