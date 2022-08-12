//Styles
import './Settings.css'
//Hooks

//Icons
import { MdCancel } from 'react-icons/md'

const Settings = (props) => {

  const menuItems = [
    {
      category: 'Theme',
      options: [
        'Mako',
        'Dark',
        'Light',
        'Halloween'
      ]
    },
    {
      category: 'Date Format',
      options: [
        'MM/DD/YYYY',
        'YYYY/MM/DD'
      ]
    }
  ]


  const handleOptionClick = (category, option) => {
    if(category === 'Theme') {
      switch(option) {
        case 'Mako' : props.changeTheme('mako')
        break
        case 'Dark' : props.changeTheme('dark')
        break
        case 'Light' : props.changeTheme('light')
        break
        case 'Halloween' : props.changeTheme('halloween')
        break
        // case 'Mako' : props.changeTheme('mako')
        // break
        default : props.changeTheme('mako')
      }
    }
  }





  // ! COMPONENT
  return (
    <div class='menu-wrapper'>
      {/* //// SETTINGS MENU HEADER / CLOSE SETTINGS BUTTON*/}
      <h1 className='menu-header'><span>Settings</span><MdCancel className='cancel-btn' onClick={props.toggleSettingsMenu}/></h1>
      {/* //// SETTINGS MENU - Populates by iterating through menuItems array, defined above. Helloooo dynamic, extensible menu! */}
      <ul className='menu'>
        {menuItems.map(menuItem => (
          <li className='menu-item'>
            {/* The menu property name; ie 'Theme', 'Date Format', etc */}
            <div className='menu-property'>
              {menuItem.category}:
            </div>
            {/* The menu value, which is a list of options to be selected */}
            <div className='menu-value menu-select-wrapper'>
              <ul className='menu-select' id='theme-menu-select'>
                {menuItem.options.map(option => (
                  <li className='menu-select-option' id={option} onClick={() => handleOptionClick(menuItem.category, option)}>{option}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}




    </ul>
    </div>
  )
}

export default Settings
