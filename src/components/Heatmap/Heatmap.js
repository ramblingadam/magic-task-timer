// Styles
import Task from '../Task/Task'
import './Heatmap.css'
// Hooks


const Heatmap = props => {
  console.log(props)

  // ! FUNCTIONS
  const yearArray = []
  const today = new Date()
  const oneYearAgoToday = new Date(new Date().setDate(new Date().getDate()-365))
  const oneMonthAgoToday = new Date(new Date().setDate(new Date().getDate()-30))
  const oneWeekAgoToday = new Date(new Date().setDate(new Date().getDate()-7))
  // console.log('hi')

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
  // console.log(yearArray)

  // ! INITIALIZATION - BUILD HEAT MAP ARRAY
  buildHeatmap()






  // ! COMPONENT
  return (
    <div className='heatmap-wrapper'>
      <div className='heatmap-grid'>
        {yearArray.map(day => (
          //// thresholds:
          //// 10mins(600000): low
          //// 30mins(1800000): lowmed
          //// 1 hour(3600000): med
          //// 2 hours(7200000): medhigh
          //// 3 hours(10800000): high
          <div className={`day-box ${day.time && (
            day.time < 600000 ? 'heat-low'
            : day.time < 1800000 ? 'heat-lowmed'
            : day.time < 3600000 ? 'heat-med'
            : day.time < 7200000 ? 'heat-medhigh'
            : 'heat-high') }`}>
            <div className='day-popup'>
              {/* // TODO only display time if time logged TEST ME */}
              {day.date} {day.time && props.convertTime(day.time)}
            </div>
          </div>
        ))}
      </div>
     
    </div>
  )
}



export default Heatmap
