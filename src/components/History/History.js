// Styles
import './History.css'


const History = props => {

  //// Format Date
  const formatDate = (date, format) => {
    if(format === 'short') {
      return date.slice(5, 7) + '/' + date.slice(8)
    }
  }

  // !COMPONENT
  return (
    <div className={`slide-able history-wrapper`}>
    <table className='history-table text-shadow'>
      <tbody>
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
  )
}

export default History
