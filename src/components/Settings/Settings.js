//Styles
import './Settings.css'
//Hooks
import { useState } from 'react'
//Icons
import { MdCancel } from 'react-icons/md'

const Settings = (props) => {


  // ! STATE
  const defaultSettings = {
    theme: 'mako'
  }
  const [currentSettings, setCurrentSettings] = useState(!localStorage.getItem('settings') ? defaultSettings : JSON.parse(localStorage.getItem('settings')))

  const menuItems = [
    {
      setting: 'Theme',
      options: [
        'Mako',
        'Dark',
        'Light',
        'Halloween'
      ]
    },
    // {
    //   setting: 'Date Format',
    //   options: [
    //     'MM/DD/YYYY',
    //     'YYYY/MM/DD'
    //   ]
    // }
  ]

  // // When a setting property's value's option has been clicked, this is called. Applies the selected setting.
  const handleOptionClick = (category, option) => {
    if(category === 'Theme') {
      switch(option) {
        case 'mako' :
          props.changeTheme('mako')
        break
        case 'dark' : 
          props.changeTheme('dark')
        break
        case 'light' : 
          props.changeTheme('light')
        break
        case 'halloween' : 
          props.changeTheme('halloween')
        break
        // case 'Mako' : props.changeTheme('mako')
        // break
        default : props.changeTheme('mako')
      }
      updateUserSetting(category.toLowerCase(), option)
    }
  }

  
  const updateUserSetting = (category, option) => {
    // First, check if user has settings in localStorage yet. If not, create them.
    if(!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify(defaultSettings))
    }

    const settings = JSON.parse(localStorage.getItem('settings'))

    settings[category] = option
    localStorage.setItem('settings', JSON.stringify(settings))
    setCurrentSettings(settings)

    console.log(settings)
  }

 

  


  // ! COMPONENT
  return (
    <div className='menu-wrapper text-shadow'>
      {/* //// SETTINGS MENU HEADER / CLOSE SETTINGS BUTTON*/}
      <div className='menu-header'>
          <h1>Settings</h1><MdCancel className='cancel-btn hover-grow glow-click' onClick={props.toggleSettingsMenu}/>
      </div>

      {/* //// SETTINGS MENU - Populates by iterating through menuItems array, defined above. Helloooo dynamic, extensible menu! */}
      <ul className='menu'>
        {menuItems.map(menuItem => (
          <li className='menu-item'>
            {/* The menu property name; ie 'Theme', 'Date Format', etc */}
            <div className='menu-property'>
              {menuItem.setting}:
            </div>
            {/* The menu value, which is a list of options to be selected */}
            <div className='menu-value menu-select-wrapper'>
              <ul className='menu-select' id='theme-menu-select'>
                {menuItem.options.map(option => (
                  <li
                  className={`menu-select-option invis-button ${option.toLowerCase() === currentSettings[menuItem.setting.toLowerCase()] ? 'active-setting' : ''}`}
                  id={option}
                  onClick={() => handleOptionClick(menuItem.setting, option.toLowerCase())}
                  >
                    {option}
                    {console.log(option.toLowerCase(), currentSettings, menuItem.setting.toLowerCase(), currentSettings[menuItem.setting.toLowerCase()])}
                  </li>
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
