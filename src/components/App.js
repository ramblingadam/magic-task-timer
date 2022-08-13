// Components
import Header from "./Header/Header"
import Tasks from './Tasks/Tasks'
import DialogBox from "./DialogBox/DialogBox"
import Settings from "./Settings/Settings"

// Hooks
import { useState, useEffect } from "react"

const App = () => {

  // ! STATE
  // TODO Dialog Box Pieces of State/description/buttons values
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)

  //! Helper Functions
  // Function and state to enable any component to trigger a full app re-render
  const [reRender, setReRender] = useState(0)
  const renderAll = () => {
    setReRender(reRender + 1)
  }

  //// TODO THEMING
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('settings')).theme || 'mako')
  const changeTheme = (theme) => {
    setTheme(theme)
    console.log('changetheme clicked')
  }
  useEffect(() => {
    console.log(theme)
    setTheme(theme)
    // renderAll()
  }, [theme])

  //// SETTINGS MENU CONTROL
  const toggleSettingsMenu = () => {
    if(settingsOpen) setSettingsOpen(false)
    else setSettingsOpen(true)
  }


  //// TODO Shows confirmaiton dialogue, and sets DialogBox/confirmation window message.
  const toggleDialogBox = (message) => {
    if(!dialogBoxVisible) {
      setDialogMessage(message)
      setDialogBoxVisible(true)
    } else {
      setDialogBoxVisible(false)
    }
  }

  // ! COMPONENT
  return (
    <div className={`app-wrapper theme-${theme}`}>
      {/* <DialogBox
          toggleDialogBox={toggleDialogBox}
        /> */}
      <div className="app">
        {settingsOpen && (
        <Settings 
            changeTheme={changeTheme}
            toggleSettingsMenu={toggleSettingsMenu}
          />
        )}
        <Header renderAll={renderAll} changeTheme={changeTheme} toggleSettingsMenu={toggleSettingsMenu}/>
        <Tasks renderAll={renderAll}/>
      </div>
    </div>
  )
}

export default App
