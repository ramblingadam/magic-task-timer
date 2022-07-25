// Components
import Heatmap from '../Heatmap/Heatmap'
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

  // Set today as the default date in the add time form.
  useEffect(() => {
    setDateInForm('today')
  }, [])

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
  const updateTime = (operation) => {
    const totalTimeInput = ((hoursToAdd * 60) + minutesToAdd) * 60000
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
      if(window.confirm('Really overwrite the total time spent on this task? This is not reversible.')) {
        props.updateTask(undefined, totalTimeInput, selectedDate)
      }
    }
    // Reset Time Form states on submission.
    setHoursToAdd('')
    setMinutesToAdd('')
    setDateInForm('today')
    // Hide form.
    props.toggleAddTimeForm()
  }



  // // Set date
  const setDateInForm = specificDate => {
    // If this function is called by state intialization, set date to today.
    if(specificDate = 'today') {
      const today = props.getToday()
      setSelectedDate(today)
      setToday(today)
    } else {
      // setSelectedDate
    }
  }

  //// Format Date
  const formatDate = (date, format) => {
    if(format === 'short') {
      return date.slice(5, 7) + '/' + date.slice(8)
    }
  }



  // ! Component
  return (
    <div className="add-time">
      <form>
        <p>Enter a number of hours and/or minutes, then press <span className='red'>Subtract</span>, <span className='yellow'>Set</span>, or <span className='green'>Add</span> to adjust the total time for the specified date.</p>
        <div>
          {/* Date Input */}
          <label><span className='heading'>Date</span>
            <input type="date" id="choose-date" value={selectedDate} max={today} onChange={(e) => handleTimeChange('date', e)}/>
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
          <p id='set-time' className='time-edit-btn yellow'onClick={() => updateTime('set')}>SET</p>
          <MdAddCircle id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/>
        </div>
      </form>

      {/* //// Task History Calendar/Heatmap */}
      <div className={`slide-able history-wrapper`}>
        <table className='history text-shadow'>
          <tbody>
            {props.task.dates.map(date => (
              <tr>
                <td className='history-date'>
                  {formatDate(date.date, 'short')}
                </td>
                <td className='history-time'>
                  {props.convertTime(date.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Heatmap
        convertTime={props.convertTime}
        task={props.task}
      />

    </div>
  )
}

export default AddTime