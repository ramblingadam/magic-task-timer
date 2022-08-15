// Styles
import Task from '../Task/Task'
import './Heatmap.css'
// Hooks


const Heatmap = props => {
  // console.log(props)

  // ! STATE



  // ! FUNCTIONS
  const yearArray = []
  const today = new Date()
  const oneYearAgoToday = new Date(new Date().setDate(new Date().getDate()-365))
  const twoMonthsAgoToday = new Date(new Date().setDate(new Date().getDate()-60))
  const oneMonthAgoToday = new Date(new Date().setDate(new Date().getDate()-30))
  const oneWeekAgoToday = new Date(new Date().setDate(new Date().getDate()-7))
  
  const monthArray = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  ///// parseDate converts a date into a string in the format of YYYY-MM-DD. Defaults to today if no argument given.
  const parseDate = (date = Date.now(), format) => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = date.getDate()
    day = day >= 10 ? day : '0' + day

    let parsed = null
    if(!format) {
      parsed = `${year}-${month}-${day}`
    } else if(format ==='usa-long') {
      parsed = `${month}/${day}/${year}`
    }
    return parsed
  }


  // TODO convert YYYY-MM-DD to other date formats
  const convertDateFormat = (dateString, format) => {
    let result = dateString
    const dateStringArray = dateString.split('-')
    const yyyy = dateStringArray[0]
    const mm = dateStringArray[1]
    const dd = dateStringArray[2]

    const yy = yyyy.slice(2)
    const m = mm.startsWith('0') ? mm.slice(1) : mm
    const d = dd.startsWith('0') ? dd.slice(1) : dd

    if(format === 'M/D/YY') {
      result = `${m}/${d}/${yy}`
    } else if(format === 'D/M/YY') {
      result = `${d}/${m}/${yy}`
    }
    return result
  }

  //// addDays takes in a date and a number of days, returning a new date object which is -days- after the original date.
  const addDays = (date, days) => {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  //// areDatesEqual takes in two date objects, and compares the parsed string versions of the dates. Returns true if dates are equal, otherwise false.
  const areDatesEqual = (date1, date2) => {
    if(parseDate(date1) === parseDate(date2)) return true
    else return false
  }

  //// Assemble year array, consisting of every day from 365 days ago to current date, to use to render heatmap grid
  // TODO buid heatmap by week....
  const buildHeatmapByWeek = () => {
    // Set the start of the week. 0 = sunday, 6 = saturday
    const weekStart = 0

    // Initialize week subarray.
    let week = []
 
    // Add days to year array, starting from one year ago from today and ending at today.
    for(let date = oneYearAgoToday; areDatesEqual(date, addDays(today, 1)) === false; date = addDays(date, 1)) {
  
      // If current day is the day specified as the start of the week, store the previous week subarray in yearArray and start a new week subarray.
      if( date.getDay() === weekStart) {
        // while(week.length < 7) {
        //   week.unshift({date: null})
        // }
        yearArray.push(week)
        // console.log(week)
        week = []
      }

      // When loop reaches today, if we haven't yet pushed current week into year array based on weekStart, then push current week.
      // if(areDatesEqual(date, today) && date.getDay() !== weekStart) {
      if(areDatesEqual(date, today)) {
        // console.log('this is the end, did we make it on sunday?')
        yearArray.push(week)
      }


      // console.log(props.task.dates)
      const workedDate = props.task.dates.find(dateEntry => dateEntry.date === parseDate(date))

      if(workedDate) {
        week.push(workedDate)
      } else week.push({date: parseDate(date), time: null, day: date.getDay()})
    }
  }
  // console.log(yearArray)

  // ! INITIALIZATION - BUILD HEAT MAP ARRAY
  buildHeatmapByWeek()






  // ! COMPONENT
  return (
    <div className='heatmap-wrapper'>
      <div className='heatmap-grid'>
        {/* {yearArray.map(day => (
          //// thresholds:
          //// < 10mins(600000): low
          //// < 30mins(1800000): lowmed
          //// < 1 hour(3600000): med
          //// < 2 hours(7200000): medhigh
          //// > 2 hours(10800000): high
          <div
            className={`day-box ${day.time && (
              day.time < 600000 ? 'heat-low'
              : day.time < 1800000 ? 'heat-lowmed'
              : day.time < 3600000 ? 'heat-med'
              : day.time < 7200000 ? 'heat-medhigh'
              : 'heat-high')}`}
            key={day.date}
          >
            <div className='day-popup'>
              <p>{day.date}</p> */}
              {/* Only display time if time logged for that date. */}
              {/* <p>{day.time && props.convertTime(day.time)}</p>
            </div>
          </div>
        ))} */}

        {yearArray.map((week,i) => (
          //// thresholds:
          //// < 10mins(600000): low
          //// < 30mins(1800000): lowmed
          //// < 1 hour(3600000): med
          //// < 2 hours(7200000): medhigh
          //// > 2 hours(10800000): high
          <div
            className={`week-column ${i === 0 ? 'first-week' : ''}`}
            key={`Week ${i + 1}`}
          >
            <div className='day-box day-box-month text-shadow'>
              
              {week.find(day => day.date.slice(8) === '01') && monthArray[+(week.find(day => day.date.slice(8) === '01').date.slice(5, 7))]}
            </div>
            {week.map(day => (
              
            <div
              className={`day-box day-box-hoverable ${day.time ?
                  (
                  day.time < 600000 ? 'heat-low'
                  : day.time < 1800000 ? 'heat-lowmed'
                  : day.time < 3600000 ? 'heat-med'
                  : day.time < 7200000 ? 'heat-medhigh'
                  : 'heat-high'
                  )
                  : ''
                } ${
                  day.date === props.selectedDate ? 'selected-date' : ''
                }`
              }
              key={day.date}
              onClick={() => props.setDateInForm(day.date)}
            >
              <div className={`day-popup
                ${day.date < parseDate(twoMonthsAgoToday) ? 'hover-left' : ''}`
                }>
                <p>{convertDateFormat(day.date, 'M/D/YY')}</p>
                {/* <p>{day.day}</p> */}
                {/* Only display time if time logged for that date. */}
                <p>{day.time && props.convertTime(day.time)}</p>
              </div>
            </div>
            ))}
          </div>
        ))}
          <div className='week-column'>
            <div className='day-box day-box-text text-shadow'></div>
            <div className='day-box day-box-text text-shadow'></div>
            <div className='day-box day-box-text text-shadow'>Mon</div>
            <div className='day-box day-box-text text-shadow'></div>
            <div className='day-box day-box-text text-shadow'>Wed</div>
            <div className='day-box day-box-text text-shadow'></div>
            <div className='day-box day-box-text text-shadow'>Fri</div>
            <div className='day-box day-box-text text-shadow'></div>
          </div>
        

      </div>
     
    </div>
  )
}



export default Heatmap
