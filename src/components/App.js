// Components
import Header from "./Header/Header"
import Tasks from './Tasks/Tasks'
import DialogBox from "./DialogBox/DialogBox"
import Settings from "./Settings/Settings"
import Help from "./Help/Help"
import Footer from "./Footer/Footer"

// Hooks
import { useState, useEffect } from "react"

const App = () => {

  const defaultSettings = {
    theme: 'mako',
    helptext: true,
    helpviewed: false
  }
  const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings

  // ! STATE
  // TODO Dialog Box Pieces of State/description/buttons values
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(settings?.helpviewed ? false : true)

  //! Helper Functions
  // Function and state to enable any component to trigger a full app re-render
  const [reRender, setReRender] = useState(0)
  const renderAll = () => {
    setReRender(reRender + 1)
  }

  // Function and state to track current category so that we can adjust behavior in the header based on the current category- namely, when a category is selected and a new task is created, automatically place that task into the current category.
  const [globalCurrentCategory, setGlobalCurrentCategory] = useState('Mako')
  const changeGlobalCategory = (category) => {
    setGlobalCurrentCategory(category)
  }

  // ! SETTINGS-RELATED FUNCTIONS, STATE, AND PROPS TO PASS DOWN COMPONENTS
  //// SETTINGS MENU CONTROL
  const toggleSettingsMenu = () => {
    if(settingsOpen) setSettingsOpen(false)
    else setSettingsOpen(true)
  }

  //// THEMING
  const [theme, setTheme] = useState(settings?.theme || 'mako')
  const changeTheme = (theme) => {
    setTheme(theme)
    console.log('changetheme clicked')
  }
  useEffect(() => {
    // console.log(theme)
    setTheme(theme)
    // renderAll()
  }, [theme])

  //// HELP TEXT VISIBILITY
  const [helpTextPref, setHelpTextPref] = useState(settings?.helptext || true)
  const updateHelpTextPref = () => {
    if(helpTextPref) {
      settings.helptext = false
    } else {
      settings.helptext = true
    }
    localStorage.setItem('settings', JSON.stringify(settings))
    setHelpTextPref(!helpTextPref)
  }

  //// SHOW INTRO/HELP WINDOW
  const toggleHelpOpen = () => {
    settings.helpviewed = true
    localStorage.setItem('settings', JSON.stringify(settings))
    setHelpOpen(!helpOpen)

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
        {helpOpen && (
          <Help
            toggleHelpOpen={toggleHelpOpen}  
          />
        )}
        {settingsOpen && (
        <Settings 
            changeTheme={changeTheme}
            updateHelpTextPref={updateHelpTextPref}


            toggleSettingsMenu={toggleSettingsMenu}
            renderAll={renderAll}
          
          />
        )}
        <Header
          renderAll={renderAll}
          changeTheme={changeTheme}
          toggleHelpOpen={toggleHelpOpen}
          toggleSettingsMenu={toggleSettingsMenu}
          globalCurrentCategory={globalCurrentCategory}
          settings={settings}
        />
        <Tasks
          renderAll={renderAll}
          globalCurrentCategory={globalCurrentCategory}
          changeGlobalCategory={changeGlobalCategory}
          settings={settings}
        />
       
      </div>
      <Footer />
    </div>
  )
}

export default App
