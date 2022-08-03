// Components
import Heatmap from '../Heatmap/Heatmap'
import History from '../History/History'
// State
import { useState, useEffect } from 'react'
// Styles
import './AddTime.css'
// Icons
import { MdAddCircle, MdRemoveCircle, MdAdd, MdRemove } from "react-icons/md"



import plusButton from '../../icons/add_FILL0_wght400_GRAD0_opsz48.svg'
import removeButton from '../../icons/remove_FILL0_wght400_GRAD0_opsz48.svg'

const AddTime = (props) => {

  // ! Pieces Of State
  // Tracks values in hours and minutes input box.
  const [hoursToAdd, setHoursToAdd] = useState('')
  const [minutesToAdd, setMinutesToAdd] = useState('')
  // Tracks the date in the date input box..
  const [selectedDate, setSelectedDate] = useState('')
  const [today, setToday] = useState('')
  // Causes the date input to flash whenever the selected date is updated via clicking on heatmap or the history table.
  const [dateInputFlash, setDateInputFlash] = useState(false)


  // Set today as the default date in the add time form. In addition, if a future date is selected, automatically change the selection to today.
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
  const updateTime = (operation) => {
    const totalTimeInput = ((hoursToAdd * 60) + minutesToAdd) * 60000

    if(operation !== 'delete' && totalTimeInput === 0) return

    // Grab the currently stored time for the selected date, if it exists.
    const selectedDateOldTime = props.task.dates[props.task.dates.findIndex(date => date.date === selectedDate)]?.time
    // console.log('prev time', selectedDateOldTime, 'time input', totalTimeInput, 'new total', selectedDateOldTime + totalTimeInput)

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
    if(operation === 'delete') {
      // If a time entry exists for selected date, ask for confirmation, then delete. If no time entry for the selected date, then nothing happens.
      if(selectedDateOldTime) {
        if(window.confirm(`Really DELETE all time spent on '${props.task.name}' for the date ${selectedDate}? This is not reversible.`)) {
          props.updateTask(undefined, -1, selectedDate)
        }
      }
    }

    // Reset Time Form states on submission.
    setHoursToAdd('')
    setMinutesToAdd('')
    
    // TODO Set dat back to today by default.... maybe not have this?
    // setDateInForm('today')

    // Auto-Hide form on entry of anything.
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
        
      <form className='add-time-form'>

        <div>
          {/*//// Date Input */}
          <label className={`${dateInputFlash ? 'flash' : ''}`}><span className='heading'>Date</span>
            <input type="date" id="choose-date"  value={selectedDate} max={today} onChange={(e) => handleTimeChange('date', e)}/>
          </label>
          {/*//// Hours Input */}
          <label><span className='heading'>Hours</span>
            <input type="number" id="add-hours" value={hoursToAdd} onChange={(e) => handleTimeChange('hours', e)}/>
          </label>
          {/*//// Minutes Input */}
          <label><span className='heading'>Minutes</span>
            <input type="number" id="add-minutes" value={minutesToAdd} onChange={(e) => handleTimeChange('mins', e)}/>
          </label>
        </div>

        {/*//// Subtract, Set, Add, and Delete Buttons */}
        <div className='add-subtract-btns'>

          {/* //// Subtract Time */}
          <div className='subtract-time-wrapper'>
            {/* <MdRemoveCircle id='subtract-time' className='time-edit-btn' onClick={() => updateTime('subtract')}/> */}
            {/* <MdRemove id='subtract-time' className='time-edit-btn' onClick={() => updateTime('subtract')}/> */}
            {/* <img src={removeButton} id='subtract-time' className='time-edit-btn' onClick={() => updateTime('add')}/> */}
            <svg id='subtract-time' className='time-edit-btn' onClick={() => updateTime('add')} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9.15 26.35v-4.7h29.7v4.7Z"/></svg>
          </div>
          

          {/* //TODO GROUP SET AND DELETE BUTTONS? */}
          <div className='time-set-delete-wrapper'>
            <p id='set-time' className='time-edit-btn yellow'onClick={() => updateTime('set')}>SET</p>
            <p id='delete-time' className='time-edit-btn' onClick={() => updateTime('delete')}>DELETE</p>
          </div>

          {/* //// Add Time */}
          <div className='add-time-wrapper'>
            {/* <MdAddCircle id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/> */}
            {/* <img src={plusButton} id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/> */}
            {/* <img src={plusButton}></img> */}
            {/* <svg id='add-time' className='time-edit-btn' onClick={() => updateTime('add')} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg> */}
            <svg id='add-time' className='time-edit-btn' onClick={() => updateTime('add')} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.65 38.85v-12.5H9.15v-4.7h12.5V9.15h4.7v12.5h12.5v4.7h-12.5v12.5Z"/></svg>
          </div>
          
         
          {/* <p id='set-time' className='time-edit-btn yellow'onClick={() => updateTime('set')}>SET</p>
          <p id='delete-time' className='time-edit-btn' onClick={() => updateTime('delete')}>DELETE</p>
          <MdAddCircle id='add-time' className='time-edit-btn' onClick={() => updateTime('add')}/>
        </div>
        <div className='delete-time-btn-wrapper'>
          <p id='delete-time' className='time-edit-btn' onClick={() => updateTime('delete')}>DELETE</p> */}

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