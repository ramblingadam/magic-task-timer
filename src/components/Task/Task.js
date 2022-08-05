// Hooks
import { useState, useEffect } from "react"
// Components
import AddTime from "../AddTime/AddTime"
import Button from '../Button/Button'

// Style
import './Task.css'
// Icons
import { MdEdit, MdDelete, MdAvTimer, MdHistoryEdu, MdHistory, MdHistoryToggleOff, MdExpandLess, MdExpandMore, MdCalendarToday, MdCalendarViewMonth, MdPlayArrow, MdStop, MdAllInclusive} from "react-icons/md"

const Task = (props) => {

  //! Pieces of State
  //// Timer Stuff
  const [timerRunning, setTimerRunning] = useState(false)
  // TODO NEW TOTAL TIME
  const [totalTime, setTotalTime] = useState((props.task.dates.reduce( (acc, date) => acc + date.time, 0)))

  // Initialize timer start time to null. Changes every 1 second when timer running.
  const [startTime, setStartTime] = useState(null)

  // Store current time of ticking timer only, NOT including previous time in task
  const [runningTime, setRunningTime] = useState(0)

  //// Add Time Form stuff
  const [showAddTimeForm, setShowAddTimeForm] = useState(false)
  const [addTimeFormCollapsed, setAddTimeFormCollapsed] = useState(true)
  // Track animation completion to determine reveal/revealed or hide/hidden class on task form
  const [addTimeFormAnimationDone, setAddTimeFormAnimationDone] = useState(true)

  //// Determines if Time Display set to All-Time or to Today 
  const [mainTimeIsGrandTotal, setMainTimeIsGrandTotal] = useState(true)


  // TODO Window Resizing for tiem display
  // const [screenWidth, setScreenWidth] = useState()

  const getScreenWidth = () => {
    const { innerWidth } = window
    return innerWidth
  }



  //// Converts ms into a a string with hrs, mins, secs
  const convertTime = (ms, format = 'long') => {
    // let seconds = Math.round(ms / 1000)
    // let minutes = 0
    // let hours = 0
    // let days = 0
    // while(seconds >= 60) {
    //   minutes += 1
    //   seconds -= 60
    // }
    // while(minutes >= 60) {
    //   hours += 1
    //   minutes -= 60
    // }

    // TODO make it cheaper CPU wise
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    // while(hours >= 24) {
    //   days += 1
    //   hours -= 24
    // }
    // return `${days ? days + 'days : ' : ''} ${hours}hrs : ${minutes}mins : ${seconds}secs`

    const width = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    const short = width < 700 ? true : false
    // return `${hours}hrs : ${minutes}mins : ${seconds}secs`
    if(!format || format === 'long') {
      return `${hours}h : ${minutes}m : ${seconds}s`
      // TODO short format mode for time? not used anywhere yet
    } else if(format ==='short') {
      return `${hours}h : ${minutes}m`
    }
  }

 

  //// Visual time update functions
  useEffect(() => {
    // TODO WHY ISN'T HIDE FORM ANIMATION WORKING ON CLICK OF PLAY?
    // if(showAddTimeForm) toggleAddTimeForm()

    let interval = null
    if(timerRunning) {
      interval = setInterval(() => {updateTime()}, 1000)

    }
    else if(!timerRunning) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning])


  const updateTime = () => {
    setTotalTime(totalTime + (Date.now() - startTime))
    console.log('we adding a second')

   

    // Store running time
    setRunningTime(Date.now() - startTime)

    setStartTime(Date.now())
  }

  // // Task object updater - localStorage
  // TODO THE TIME PARAMETER AAAHH
  const updateTask = (name, time, date) => {
    // Copy current task. We will modify this copy with the requested changes before injecting it back into the database.
    const updatedTask = props.task
    


    // If a valid time passed in, update time for selected date OR today.
    // In other words- if ONLY a new name is passed in, skip the following and just update the name.
    if(time) {
    
      const today = getToday()

      // If no date passed in, default to today
      if(!date) date = today

      // Grab index of the current date entry within the current task.
      const currentDateIndex = updatedTask.dates.findIndex(dateEntry => dateEntry.date === date)
      // If time passed in greater than 0, update time for selected dates entry. Otherwise, if time passed in is explicitly -1, then user pressed Delete button- so delete the dateentry for the selected date.
      if(time > 0) {
        if(currentDateIndex === -1) {
          updatedTask.dates.push({date: date, time: time})
        } else {
          updatedTask.dates[currentDateIndex].time = time
        }
      } else if(time === -1) { //! If time passed in is -1, then DELETE that date.
        updatedTask.dates.splice(currentDateIndex, 1)
      } 
    }

    // Only update name if a name is passed in.
    if(name) updatedTask.name = name

    // Sort all dates by most recent.
    updatedTask.dates.sort( (a, b) => b.date.localeCompare(a.date))

    // Update totalTime state to reflect any changes.
    setTotalTime(props.task.dates.reduce( (acc, date) => acc + date.time, 0))

    // Grab tasks object from localStorage, and replace current task with updatedTask.
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1, updatedTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    props.renderAll() // Re-render app so user can see changes.

  }

  // TODO SUM TIME FROM ALL DATES HELPER
  const sumTimeFromAllDates = () => {
    return props.task.dates.reduce( (acc, date) => acc + date.time, 0)
  }

  //// Get/parse/format current Date
  const getToday = () => {
    const now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = now.getDate()
    day = day >= 10 ? day : '0' + day
    const today = `${year}-${month}-${day}`
    return today
  }



  //// Timer function - Fires when PLAY or STOP pressed
  const toggleTimer = async () => {

    // If timer is NOT currently running:
    if(!timerRunning) {
      setTimerRunning(true)     
      setStartTime(Date.now())

      // TODO Maybe make this an option? Kinda like the heatmap staying open. Adding/adjusting time, even for current day while timer is running, doesn't seem to cause any problems.
      // If form is currently out, toggle it back to closed.
      // if(showAddTimeForm) toggleAddTimeForm()

    // If Timer IS currently running:
    } else { 
      setTimerRunning(false)
      // TODO New Running Time addition
      console.log(runningTime)
      // If most recent date in dates array is today, pass in runningTime + the time already recorded for today. Otherwise,just pass in runningTime, so that a new date will be created with the value.
      updateTask(undefined, props.task.dates[0]?.date === getToday() ? runningTime + props.task.dates[0].time : runningTime)

      // Reset running time to 0 when timer stopped.
      setRunningTime(0)
    }
  }

  


  //// Delete Task
  const deleteTask = () => {
    if(window.confirm(`Are you sure you want to delete ${props.task.name}?`)) {
      // Grab tasks from localStorage and delete current task.
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      // Reassign sort order for all items occuring AFTER current item by moving them all up one position (position -1)
      tasks.forEach(task => {
        if(task.sortPosition > props.task.sortPosition) task.sortPosition -= 1
      })
      // Delete current task.
      tasks.splice(tasks.findIndex(task => task.id === props.task.id), 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      props.renderAll() // Re-render app.
    }
  }

  //// Edit Task
  const editTask = () => {

    const newName = window.prompt('Enter new task name.', props.task.name)
    // User passes in any empty string. Warn, and exit without updating.
    if(newName === '') {
      alert('Task name cannot be blank.')
      return
    }
    // User presses cancel, setting newName to null. Exit without updating.
    if(newName === null){
      return
    }

    updateTask(newName)
  }


  //// Show "Add/Subtract/Set" Time Form/Heatmap/History Table
   // TODO change selecteddate in addtime form to today whenever form opened

 
  const toggleAddTimeForm = () => {
    setAddTimeFormAnimationDone(false)
    // TODO if this line is uncommented, it will ignore clicks on the button if form is open- old behavior, when time form auto-hides and can't be opened while timer running.
    // if(timerRunning) return

    if(addTimeFormCollapsed) {
      setTimeout(() => {
        // Trigger swapping hide animation CSS class with hidden static CSS class.
        setAddTimeFormCollapsed(false)
        setAddTimeFormAnimationDone(true)
      }, 601)
    } else {
      setTimeout(() => {
        // Trigger swapping reveal animation CSS class with revealed static CSS class.
        setAddTimeFormCollapsed(true)
        setAddTimeFormAnimationDone(true)
      }, 601)
    }
    setShowAddTimeForm(!showAddTimeForm)
  }

  //// Task Reordering
  const reorder = direction => {
    // Store current task position. (redundant...)
    const currentTaskPosition = props.task.sortPosition

    // First, grab all tasks.
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    if(direction === 'up') { // If we are sorting the task up...
      // ...then change current tasks position by -1 (moving it up the list)
      // ...and change the task directly above the current tasks position by +1 (moving it down)
      tasks.forEach(task => {
        if(task.sortPosition === currentTaskPosition) {
          task.sortPosition -= 1
        } else if (task.sortPosition === currentTaskPosition - 1) {
          task.sortPosition += 1
        }
      })
    } else if(direction === 'down') { //If sorting down, do the opposite of above...
      // ...by changing current tasks position by +1 (moving it down one slot)
      // ...and changing the task directly below the current tasks position by -1 (moving it up)
      tasks.forEach(task => {
        if(task.sortPosition === currentTaskPosition) {
          task.sortPosition += 1
        } else if (task.sortPosition === currentTaskPosition + 1) {
          task.sortPosition -= 1
        }
      })
    }
    // Store new order in storage/DB.
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // Re-render Tasks so that new order is instantly visible.
    props.renderAll()
  }

  // TODO TOGGLE timeframe from Day Total to Overall Total
  const toggleTimeframe = () => {
    setMainTimeIsGrandTotal(!mainTimeIsGrandTotal)
  }



 

  //! Component
  return (
    <li className={`task ${timerRunning ? 'running' : ''}`}>

      {/*//// Task Top Row: Task Name, Setting Buttons  */}
      <div className='task-name text-shadow'>
        <p>{props.task.name}</p>
        <div className='icon-buttons'>
 
          {/* //TODO This version disables hisory button when timer running.  */}
          {/* <MdHistoryToggleOff className={`edit-time-btn ${timerRunning ? 'disabled' : ''} ${showAddTimeForm ? 'edit-time-btn-form-visible' : ''}`} onClick={toggleAddTimeForm}/> */}
          {/* //TODO  this version does not disable button when timer running. */}
          <MdHistoryToggleOff className={`edit-time-btn ${showAddTimeForm ? 'edit-time-btn-form-visible' : ''}`} onClick={toggleAddTimeForm}/>

          {/*  */}
          <MdEdit className="edit-btn" onClick={editTask}/>
          <MdDelete className="delete-btn" onClick={deleteTask}/>
        </div>
      </div>

      {/*//// Task Info: Sort Buttons, Time Display, Big Start Timer Button */}
      <div className='task-info'>

        {/* //// SORT BUTTONS */}
        <div className='sort-btns'>
          <MdExpandLess className='sort-btn' onClick={props.task.sortPosition > 1 ? () => reorder('up') : null}/>
          <MdExpandMore className='sort-btn' onClick={props.task.sortPosition < JSON.parse(localStorage.getItem('tasks')).length ? () => reorder('down') : null}/>
         </div>

         {/* //// TASK TIME */}
        <div className='task-time text-shadow' onClick={toggleTimeframe}>
 
          {/* //TODO TOGGLE TIMEFRAME BIG BUTTON NEXT TO TIME */}
          {/* <p className=''>
            <span className='timeframe-toggle-btn-big'>{mainTimeIsGrandTotal ? <MdAllInclusive /> :<MdCalendarToday />}</span>
            {mainTimeIsGrandTotal ? convertTime(totalTime) : convertTime(props.task.dates[0].time + runningTime)}
          </p> */}

          <p className=''>
            <span className='timeframe-toggle-btn-big'>{mainTimeIsGrandTotal ? <MdAllInclusive className='icon-shadow'/> :<MdCalendarToday className='icon-shadow'/>}</span>
            {mainTimeIsGrandTotal // If timeframe set to Grand Total,
              // Display grand total time.
              ? convertTime(totalTime) 
              // else(timeframe set to Today), check if the current task has a date entry at all, AND if task's most recent entry is from today.
              : props.task.dates[0] && props.task.dates[0].date === getToday() 
                //If both are true, then render the time as most recent entry + runningTime of timer.
                ? convertTime(props.task.dates[0].time + runningTime)
                // Else(Task has no dates logged, or most recent logged date is not today), display runningTime only. Time will be saved as today once the timer is stopped.
                : convertTime(runningTime)
            }
          </p>

        </div>

        {/* Big Start Time Button */}
        <div className='task-buttons'>
          <button className={`task-btn btn ${timerRunning ? 'running' : ''}`} onClick={toggleTimer}>
            {timerRunning ? <MdStop /> : <MdPlayArrow />}
          </button>
        </div>

      </div>
      {/* //// End Task Info: Sort Buttons, Time Display, Start Button */}

      {/*//// Add Time Form  */}
      <div className={`slide-able ${showAddTimeForm && !addTimeFormAnimationDone ? 'reveal' : showAddTimeForm ? 'revealed' : addTimeFormCollapsed || (!showAddTimeForm && addTimeFormAnimationDone) ? 'hidden' : 'collapse'}`}>
        <AddTime
          task={props.task}
          updateTask={updateTask}
          toggleAddTimeForm={toggleAddTimeForm}
          convertTime={convertTime}
          getToday={getToday}
        />
       

      </div>

  

    </li>
  )
}

export default Task
