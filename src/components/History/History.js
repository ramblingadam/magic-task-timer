// Styles
import './History.css'
// Hooks
import { useState } from 'react'


const History = props => {

  // ! STATE
  const [historyTableHidden, setHistoryTableHidden] = useState(true)
  const [historyTableRevealed, setHistoryTableRevealed] = useState(true)
  const [historyTableRevealAnimationRunning, setHistoryTableRevealAnimationRunning] = useState(false)
  const [historyTableHideAnimationRunning, setHistoryTableHideAnimationRunning] = useState(false)


  // ! FUNCTIONS
  //// TODO when HISTORY clicked, show table
  const handleHistoryClick = () => {
    // If history table is open....
    if(historyTableHidden) {
      
      
      setHistoryTableRevealAnimationRunning(true)
      setHistoryTableHidden(false)

      setTimeout(() => {
        setHistoryTableRevealAnimationRunning(false)
        setHistoryTableRevealed(true)
      }, 600)

    // If history table is closed...
    } else {

      setHistoryTableHideAnimationRunning(true)
      setHistoryTableRevealed(false)

      setTimeout(() => {
        setHistoryTableHideAnimationRunning(false)
        setHistoryTableHidden(true)
      }, 600)
    }
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
    <div className={`history-component-wrapper ${historyTableHidden ? 'compressed' : historyTableRevealed ? 'uncompressed' : historyTableRevealAnimationRunning ? 'uncompressing' : historyTableHideAnimationRunning ? 'compressing' : ''} ${datesLength >= 6 ? 'scrollbar-corner-radius' : ''}`}>

      <button onClick={handleHistoryClick} className='btn btn-history'>History</button>

      <div className={`slide-able history-wrapper ${datesLength >= 6 ? 'scrollbar-y' : ''} ${historyTableHidden ? 'hidden' : historyTableRevealed ? 'revealed' : historyTableRevealAnimationRunning ? 'reveal' : historyTableHideAnimationRunning ? 'collapse' : ''}`}>
      
        <table className={`history-table text-shadow `}>
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
