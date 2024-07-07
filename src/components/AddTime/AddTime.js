// Components
import Heatmap from '../Heatmap/Heatmap'
import History from '../History/History'
// State
import { useState, useEffect } from 'react'
// Styles
import './AddTime.css'
// Icons
// import { MdAddCircle, MdRemoveCircle, MdAdd, MdRemove } from "react-icons/md"

const AddTime = (props) => {
  // ! Pieces Of State
  // Tracks values in hours and minutes input box.
  const [hoursToAdd, setHoursToAdd] = useState('')
  const [minutesToAdd, setMinutesToAdd] = useState('')

  const [today, setToday] = useState('')
  // Causes the date input to flash whenever the selected date is updated via clicking on heatmap or the history table.
  const [dateInputFlash, setDateInputFlash] = useState(false)

  // Set today as the default date in the add time form. In addition, if a future date is selected, automatically change the selection to today.
  useEffect(() => {
    const today = props.getToday()
    if (props.selectedDate > today || props.selectedDate === '')
      setDateInForm('today')
  }, [props.selectedDate])

  // ! Helper Functions

  // // Manage Controlled Time and Date Inputs
  const handleTimeChange = (denomination, e) => {
    const value = +e.target.value
    if (denomination === 'hours') {
      setHoursToAdd(+value > 0 ? +value : '')
    }
    if (denomination === 'mins') {
      setMinutesToAdd(+value > 0 ? +value : '')
    }
    if (denomination === 'date') {
      props.setSelectedDate(e.target.value)
    }
  }

  // // Subtract, Set, or Add the time entered into the time form
  const updateTime = (operation) => {
    const totalTimeInput = (hoursToAdd * 60 + minutesToAdd) * 60000

    if (operation !== 'delete' && totalTimeInput === 0) return

    // Grab the currently stored time for the selected date, if it exists.
    const selectedDateOldTime =
      props.task.dates[
        props.task.dates.findIndex((date) => date.date === props.selectedDate)
      ]?.time

    if (operation === 'add') {
      // If selected date exists, add value to old value. Otherwise, initialize with entered time.
      props.updateTask(
        undefined,
        selectedDateOldTime
          ? selectedDateOldTime + totalTimeInput
          : totalTimeInput,
        props.selectedDate
      )
    }
    if (operation === 'subtract') {
      // If selected date exists, subtract input value from old value. If it doesn't exist, ignore.
      if (selectedDateOldTime) {
        props.updateTask(
          undefined,
          selectedDateOldTime - totalTimeInput,
          props.selectedDate
        )
      }
    }
    if (operation === 'set') {
      props.updateTask(undefined, totalTimeInput, props.selectedDate)
    }
    if (operation === 'delete') {
      props.updateTask(undefined, -1, props.selectedDate)
    }

    // Reset Time Form states on submission.
    setHoursToAdd('')
    setMinutesToAdd('')
  }

  // // Sets the date in the date input form.
  const setDateInForm = (specificDate) => {
    // If this function is called by state intialization, set date to today.
    if (specificDate === 'today') {
      const today = props.getToday()
      props.setSelectedDate(today)
      setToday(today)
    } else {
      props.setSelectedDate(specificDate)
    }
    // props.renderAll()
    setDateInputFlash(true)
    setTimeout(() => setDateInputFlash(false), 1000)
  }

  const handleSetClick = () => {
    if (+hoursToAdd === 0 && +minutesToAdd === 0) return
    const selectedDateOldTime =
      props.task.dates[
        props.task.dates.findIndex((date) => date.date === props.selectedDate)
      ]?.time
    if (selectedDateOldTime) {
      props.setModalData({
        title: 'Set Time',
        message: () => (
          <>
            <p>
              Really <span className='warning'>OVERWRITE</span> the time spent
              on '{props.task.name}' on {props.selectedDate}?
            </p>
            <p class='warning'>Be careful! This cannot be undone.</p>
          </>
        ),
        action: () => updateTime('set'),
        yesText: 'Overwrite',
        isDestructiveAction: true,
      })
      props.openModal()
    } else updateTime('set')
  }

  const handleDeleteClick = () => {
    const selectedDateOldTime =
      props.task.dates[
        props.task.dates.findIndex((date) => date.date === props.selectedDate)
      ]?.time
    if (!selectedDateOldTime) return
    props.setModalData({
      title: 'Delete Time',
      message: () => (
        <>
          <p>
            Really <span className='warning'>DELETE</span> all time spent on '
            {props.task.name}' on {props.selectedDate}?
          </p>
          <p class='warning'>Be careful! This cannot be undone.</p>
        </>
      ),
      action: () => updateTime('delete'),
      yesText: 'Delete Time',
      isDestructiveAction: true,
    })
    props.openModal()
  }

  // ! Component
  return (
    <div className='add-time'>
      <div
        className={`add-time-instructions text-shadow ${
          props.settings?.historyhelptext === 'on' ? '' : 'display-none'
        }`}
      >
        <p>
          Enter a date, or select one from the heatmap or the history table.
        </p>
        <p>Enter a number of hours/minutes in the form.</p>
        <p>
          Then, press <span className='red tutorial-highlight'>Subtract</span>,{' '}
          <span className='yellow tutorial-highlight'>Set</span>, or{' '}
          <span className='green tutorial-highlight'>Add</span> to adjust the
          time for the selected date.
        </p>
      </div>

      <form className='add-time-form'>
        <div>
          {/*//// Date Input */}
          <label className={`${dateInputFlash ? 'flash' : ''} text-shadow`}>
            <span className='heading'>Selected Date</span>
            <input
              type='date'
              id='choose-date'
              value={props.selectedDate}
              max={today}
              onChange={(e) => handleTimeChange('date', e)}
            />
          </label>

          {/*//// Hours Input */}
          <label>
            <span className='heading text-shadow'>Hours</span>
            <input
              type='number'
              id='add-hours'
              value={hoursToAdd}
              onChange={(e) => handleTimeChange('hours', e)}
            />
          </label>

          {/*//// Minutes Input */}
          <label>
            <span className='heading text-shadow'>Minutes</span>
            <input
              type='number'
              id='add-minutes'
              value={minutesToAdd}
              onChange={(e) => handleTimeChange('mins', e)}
            />
          </label>
        </div>

        <div className='logged-time text-shadow'>
          Time logged on selected date:{' '}
          {props.task.dates[
            props.task.dates?.findIndex(
              (date) => date.date === props.selectedDate
            )
          ]?.time
            ? props.convertTime(
                props.task.dates[
                  props.task.dates?.findIndex(
                    (date) => date.date === props.selectedDate
                  )
                ]?.time
              )
            : props.convertTime(0)}
        </div>

        {/*//// Subtract, Set, Add, and Delete Buttons */}
        <div className='add-subtract-btns'>
          {/* //// Subtract Time Button*/}
          <div className='subtract-time-wrapper time-edit-btn hover-popup-wrapper'>
            <span className='hover-popup hover-popup-delay three-line'>
              Subtract the entered time
              <br />
              from the total time for the <br />
              selected date.
            </span>
            <svg
              id='subtract-time'
              onClick={() => updateTime('subtract')}
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              width='48'
            >
              <path d='M9.15 26.35v-4.7h29.7v4.7Z' />
            </svg>
          </div>

          {/* //// Set and Delete Buttons */}
          <div className='time-set-delete-wrapper'>
            <p
              id='set-time'
              className='time-edit-btn yellow hover-popup-wrapper'
              onClick={handleSetClick}
            >
              SET{' '}
              <span className='hover-popup hover-popup-delay two-line'>
                Completely overwrite the selected date's total time
                <br />
                with the entered time.
              </span>
            </p>
            <p
              id='delete-time'
              className='time-edit-btn hover-popup-wrapper'
              onClick={handleDeleteClick}
            >
              DELETE
              <span className='hover-popup hover-popup-delay'>
                Deletes all time logged on the selected date.
              </span>
            </p>
          </div>

          {/* //// Add Time Button*/}
          <div className='add-time-wrapper time-edit-btn hover-popup-wrapper'>
            <span className='hover-popup hover-popup-delay three-line'>
              Add the entered time
              <br />
              to the total time for the <br />
              selected date.
            </span>
            <svg
              id='add-time'
              onClick={() => updateTime('add')}
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              width='48'
            >
              <path d='M21.65 38.85v-12.5H9.15v-4.7h12.5V9.15h4.7v12.5h12.5v4.7h-12.5v12.5Z' />
            </svg>
          </div>
        </div>
      </form>

      {/* //// Task History Heatmap */}
      <Heatmap
        convertTime={props.convertTime}
        task={props.task}
        setDateInForm={setDateInForm}
        selectedDate={props.selectedDate}
        convertDateFormat={props.convertDateFormat}
        settings={props.settings}
      />

      {/* //// Task History Table*/}
      <History
        task={props.task}
        convertTime={props.convertTime}
        setDateInForm={setDateInForm}
        selectedDate={props.selectedDate}
        convertDateFormat={props.convertDateFormat}
        settings={props.settings}
      />
    </div>
  )
}

export default AddTime
