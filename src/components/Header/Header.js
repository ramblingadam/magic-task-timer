// Components
import NewTaskButton from '../NewTaskButton/NewTaskButton'
import SettingsButton from '../SettingsButton/SettingsButton'
// Styles
import './Header.css'

const Header = () => {
  return (
    <div className='header-wrapper'>
      <h1>Task Tracker</h1>
      <div className='header-buttons'>
        <NewTaskButton />
        <SettingsButton />
      </div>
    </div>
  )
}

export default Header
