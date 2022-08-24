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
    theme: 'lifestream',
    historyhelptext: 'on',
    stickyheatmaptooltip: 'off',
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
  //// Function and state to enable any component to trigger a full app re-render
  const [reRender, setReRender] = useState(0)
  const renderAll = () => {
    setReRender(reRender + 1)
  }

  //// Function and state to track current category so that we can adjust behavior in the header based on the current category- namely, when a category is selected and a new task is created, automatically place that task into the current category.
  const [globalCurrentCategory, setGlobalCurrentCategory] = useState('Lifestream')
  const changeGlobalCategory = (category) => {
    settings.currentcategory = category
    localStorage.setItem('settings', JSON.stringify(settings))
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
    // console.log('changetheme clicked')
  }
  useEffect(() => {
    // console.log(theme)
    setTheme(theme)
    // renderAll()
  }, [theme])

  //// HELP TEXT VISIBILITY
  const [helpTextPref, setHelpTextPref] = useState(settings?.helptext || 'on')
  const updateHelpTextPref = (option) => {
    // if(helpTextPref) {
    //   settings.historyhelptext = false
    // } else {
    //   settings.historyhelptext = true
    // }
    settings.historyhelptext = option
    localStorage.setItem('settings', JSON.stringify(settings))
    setHelpTextPref(option)
  }

  //// STICKY HEATMAP TOOLTIP
  const [stickyHeatmapTooltip, setStickyHeatmapTooltip] = useState(settings?.stickyheatmaptooltip || false)
  const updateStickyHeatmapTooltip = (option) => {
    // if(stickyHeatmapTooltip) {
    //   settings.stickyheatmaptooltip = false
    // } else {
    //   settings.stickyheatmaptooltip = true
    // }
    settings.stickyheatmaptooltip = option
    localStorage.setItem('settings', JSON.stringify(settings))
    setStickyHeatmapTooltip(option)
  }

  //// SHOW INTRO/HELP WINDOW
  const toggleHelpOpen = () => {
    settings.helpviewed = true
    localStorage.setItem('settings', JSON.stringify(settings))
    setHelpOpen(!helpOpen)

  }


  // TODO convert YYYY-MM-DD to other date formats
  const convertDateFormat = (dateString, format) => {
    let result = dateString
    const dateStringArray = dateString.split('-')
    const yyyy = dateStringArray[0]
    const mm = dateStringArray[1]
    const dd = dateStringArray[2]

    const yy = yyyy.slice(2)
    const m = mm.startsWith('0') ? mm.slice(1) : mm
    const d = dd.startsWith('0') ? dd.slice(1) : dd

    if(format === 'M/D/YY') {
      result = `${m}/${d}/${yy}`
    } else if(format === 'D/M/YY') {
      result = `${d}/${m}/${yy}`
    }
    return result
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

      <Header
          renderAll={renderAll}
          changeTheme={changeTheme}
          toggleHelpOpen={toggleHelpOpen}
          toggleSettingsMenu={toggleSettingsMenu}
          globalCurrentCategory={globalCurrentCategory}
          settings={settings}
        />
        
      <div className="app">

        {helpOpen && (
          <Help
            toggleHelpOpen={toggleHelpOpen}  
          />
        )}

        {settingsOpen && (
        <Settings 
            toggleSettingsMenu={toggleSettingsMenu}
            changeTheme={changeTheme}
            updateHelpTextPref={updateHelpTextPref}
            updateStickyHeatmapTooltip={updateStickyHeatmapTooltip}

            
            settingsOpen={settingsOpen}
            renderAll={renderAll}
          
          />
        )}

        <Tasks
          renderAll={renderAll}
          globalCurrentCategory={globalCurrentCategory}
          changeGlobalCategory={changeGlobalCategory}
          settings={settings}
          convertDateFormat={convertDateFormat}
        />
       
      </div>

      {/* <Footer /> */}

    </div>
  )
}

export default App
