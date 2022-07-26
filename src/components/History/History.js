// Styles
import './History.css'
// Hooks
import { useState } from 'react'


const History = props => {

  // ! STATE
  const [historyTableHidden, setHistoryTableHidden] = useState(true)



  // ! FUNCTIONS
  //// when HISTORY clicked, show table
  const handleHistoryClick = () => {
    setHistoryTableHidden(!historyTableHidden)
  }



  // TODO REPLACE THIS WITH MORE ROBUST changeDateFormat FUNCTION, currently in HEATMAP
  //// Format Date
  const formatDate = (date, format) => {
    if(format === 'short') {
      return date.slice(5, 7) + '/' + date.slice(8)
    }
  }

  //// ! VARIABLES / INIT
  const datesLength = props.task.dates.length

  // ! COMPONENT
  return (
    <div className='history-component-wrapper'>

      <button onClick={handleHistoryClick} className='btn btn-history'>History</button>

      <div className={`slide-able history-wrapper ${datesLength >= 6 ? 'scrollbar-y' : ''} ${historyTableHidden ? 'hidden' : ''}`}>
      
        <table className={`history-table text-shadow `}>
          {/* <thead>
            <tr>
              <td colSpan={2} onClick={handleHistoryClick}>History</td>
            </tr>
          </thead> */}
          <tbody className={``}>
            {props.task.dates.map(date => (
              <tr key={date.date} className='history-row' onClick={() => props.setDateInForm(date.date)}>
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
  </div>

  )
}

export default History
