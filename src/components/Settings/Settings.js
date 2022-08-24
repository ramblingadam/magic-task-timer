//Styles
import './Settings.css'
//Hooks
import { useState } from 'react'
//Icons
import { MdCancel, MdAdd } from 'react-icons/md'

const Settings = (props) => {


  // ! STATE
  const defaultSettings = {
    theme: 'lifestream',
    historyhelptext: 'on',
    stickyheatmaptooltip: 'off',
    helpviewed: false
  }
  const [currentSettings, setCurrentSettings] = useState(!localStorage.getItem('settings') ? defaultSettings : JSON.parse(localStorage.getItem('settings')))
  // const [currentSettings, setCurrentSettings] = useState(props.settings)

  const menuItems = [
    {
      setting: 'Theme',
      options: [
        'Lifestream',
        'Casper',
        'Rimefrost',
        // 'Sophie',
        // 'Halloween'
        'Seafoam',
        'Amethyst',
      ]
    },
    {
      setting: 'History Help Text',
      options: [
        'On',
        'Off'
      ]
    },
    {
      setting: 'Sticky Heatmap Tooltip',
      options: [
        'On',
        'Off'
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

 

  // // When a setting's value's option has been clicked, this is called. Applies the selected setting.
  const handleOptionClick = (setting, option) => {
    // THEME
    if(setting === 'Theme') {
      props.changeTheme(option)
      updateUserSetting(setting.toLowerCase(), option)
    }
    // HISTORY HELP TEXT
    if(setting === 'History Help Text') {
      switch(option) {
        case 'on' :
          props.updateHelpTextPref('on')
        break
        case 'off' :
          props.updateHelpTextPref('off')
        break
      }
      setting = 'helptext'
      updateUserSetting(setting.toLowerCase(), option)
    }
    // STICKY HEATMAP TOOLTIP
    if(setting === 'Sticky Heatmap Tooltip') {
      switch(option) {
        case 'on' :
          props.updateStickyHeatmapTooltip('on')
        break
        case 'off' :
          props.updateStickyHeatmapTooltip('off')
        break
      }
      setting = 'stickyheatmaptooltip'
      updateUserSetting(setting.toLowerCase(), option)
    }
    // console.log(currentSettings)
  }

  
  const updateUserSetting = (setting, option) => {
    // First, check if user has settings in localStorage yet. If not, create them.
    if(!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify(defaultSettings))
    }

    const settings = JSON.parse(localStorage.getItem('settings'))

    settings[setting] = option
    localStorage.setItem('settings', JSON.stringify(settings))
    setCurrentSettings(settings)

    // console.log(settings)
  }

 

  


  // ! COMPONENT
  return (
    <div className={`menu-wrapper text-shadow ${props.settingsOpen ? 'menu-open' : ''}`}>
      {/* //// SETTINGS MENU HEADER / CLOSE SETTINGS BUTTON*/}
      <div className='menu-header-wrapper'>
        <div className='menu-header'>
            {/* <h1>Settings</h1><MdCancel className='cancel-btn hover-grow glow-click icon-shadow' onClick={props.toggleSettingsMenu}/> */}
            <h1>Settings</h1><MdAdd className='cancel-btn hover-grow glow-click plus open' onClick={props.toggleSettingsMenu}/>
        </div>
      </div>
      {/* <div className='menu-header'>
          <h1>Settings</h1><MdCancel className='cancel-btn hover-grow glow-click' onClick={props.toggleSettingsMenu}/>
      </div> */}

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
                  key={option}
                  className={`menu-select-option invis-button ${
                    option.toLowerCase() === currentSettings[menuItem.setting.split(' ').join('').toLowerCase()] ? 'active-setting' : ''}`}
                  id={option}
                  onClick={() => handleOptionClick(menuItem.setting, option.toLowerCase())}
                  >
                    {option}
                    {/* {console.log(option.toLowerCase(), currentSettings, menuItem.setting.toLowerCase(), currentSettings[menuItem.setting.toLowerCase()])} */}
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
