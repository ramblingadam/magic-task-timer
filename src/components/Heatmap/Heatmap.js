// Styles
import Task from '../Task/Task'
import './Heatmap.css'
// Hooks


const Heatmap = props => {
  // console.log(props)

  // ! FUNCTIONS
  const yearArray = []
  const today = new Date()
  const oneYearAgoToday = new Date(new Date().setDate(new Date().getDate()-365))
  const oneMonthAgoToday = new Date(new Date().setDate(new Date().getDate()-30))
  const oneWeekAgoToday = new Date(new Date().setDate(new Date().getDate()-7))
  
  const monthArray = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  ///// parseDate converts a date into a string in the format of YYYY-MM-DD. Defaults to today if no argument given.
  const parseDate = (date = Date.now()) => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = date.getDate()
    day = day >= 10 ? day : '0' + day
    const parsed = `${year}-${month}-${day}`
    return parsed
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
    // TODO 0 = sunday, 6 = saturday
    const weekSplit = 0
    let week = []
 
    // Add days to year array, starting from one year ago from today and ending at today.
    for(let date = oneYearAgoToday; areDatesEqual(date, addDays(today, 1)) === false; date = addDays(date, 1)) {
  


      // TODO WEEK TESTING
      if( date.getDay() === weekSplit) {
        console.log(date, 'we splitting here')
        yearArray.push(week)
        week = []
      }

      // TODO when at today, if we haven't yet pushed current week into year array based on split day, then push current week.
      if(areDatesEqual(date, today) && date.getDay() !== weekSplit) {
        yearArray.push(week)
      }


      // console.log(props.task.dates)
      const workedDate = props.task.dates.find(dateEntry => dateEntry.date === parseDate(date))

      if(workedDate) {
        week.push(workedDate)
      } else week.push({date: parseDate(date), time: null, day: date.getDay()})
    }
  }
  console.log(yearArray)

  // TODO Old build map by day...
  const buildHeatmap = () => {

    // Add days to year array, starting from one year ago from today and ending at today.
    for(let date = oneYearAgoToday; areDatesEqual(date, addDays(today, 1)) === false; date = addDays(date, 1)) {

      // console.log(props.task.dates)
      const workedDate = props.task.dates.find(dateEntry => dateEntry.date === parseDate(date))

      if(workedDate) {
        yearArray.push(workedDate)
      } else yearArray.push({date: parseDate(date), time: null})
    }
  }

  // ! INITIALIZATION - BUILD HEAT MAP ARRAY
  // buildHeatmap()
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

        {yearArray.map(week => (
          //// thresholds:
          //// < 10mins(600000): low
          //// < 30mins(1800000): lowmed
          //// < 1 hour(3600000): med
          //// < 2 hours(7200000): medhigh
          //// > 2 hours(10800000): high
          <div className='week-column'>
            <div className='day-box day-box-month'>
              
              {week.find(day => day.date.slice(8) === '01') && monthArray[+(week.find(day => day.date.slice(8) === '01').date.slice(5, 7))]}
            </div>
            {week.map(day => (
              
              <div
              className={`day-box day-box-hoverable ${day.time && (
                day.time < 600000 ? 'heat-low'
                : day.time < 1800000 ? 'heat-lowmed'
                : day.time < 3600000 ? 'heat-med'
                : day.time < 7200000 ? 'heat-medhigh'
                : 'heat-high')}`}
              key={day.date}
            >
              <div className='day-popup'>
                <p>{day.date}</p>
                {/* Only display time if time logged for that date. */}
                <p>{day.time && props.convertTime(day.time)}</p>
              </div>
            </div>
            ))}
          </div>
        ))}
          <div className='week-column'>
            <div className='day-box day-box-text'></div>
            <div className='day-box day-box-text'></div>
            <div className='day-box day-box-text'>Mon</div>
            <div className='day-box day-box-text'></div>
            <div className='day-box day-box-text'>Wed</div>
            <div className='day-box day-box-text'></div>
            <div className='day-box day-box-text'>Fri</div>
            <div className='day-box day-box-text'></div>
          </div>
        

      </div>
     
    </div>
  )
}



export default Heatmap
