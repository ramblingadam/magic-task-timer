// Styles
import './Heatmap.css'
// Hooks


const Heatmap = props => {
  // console.log(props)

  // ! FUNCTIONS
  const yearArray = []
  const today = new Date()
  const oneYearAgoToday = new Date(new Date().setDate(new Date().getDate()-365))
  const oneMonthAgoToday = new Date(new Date().setDate(new Date().getDate()-30))
  // console.log('hi')

  const parseDate = (date = Date.now()) => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let day = date.getDate()
    day = day >= 10 ? day : '0' + day
    const parsed = `${year}-${month}-${day}`
    return parsed
  }

  const addDays = (date, days) => {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const areDatesEqual = (date1, date2) => {
    if(parseDate(date1) === parseDate(date2)) return true
    else return false
  }

  // Assemble year array to use to render heatmap grid
  for(let date = oneYearAgoToday; areDatesEqual(date, addDays(today, 1)) === false; date = addDays(date, 1)) {
    yearArray.push({date: parseDate(date), time: 'placeholder'})
  }
  // console.log(yearArray)

 






  // ! COMPONENT
  return (
    <div className='heatmap-wrapper'>
      <div className='heatmap-grid'>
        {yearArray.map(day => (
          <div className='day-box'>
            <div className='day-popup'>
              {/* // TODO only display time if time logged TEST ME */}
              {day.date} {day.time && day.time}
            </div>
          </div>
        ))}
      </div>
     
    </div>
  )
}



export default Heatmap
