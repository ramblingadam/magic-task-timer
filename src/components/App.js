// Components
import Header from "./Header/Header"
import Tasks from './Tasks/Tasks'
import DialogBox from "./DialogBox/DialogBox"

// Hooks
import { useState } from "react"

const App = () => {

  // ! STATE
  // TODO Dialog Box Pieces of State/description/buttons values
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')


  //! Helper Functions
  // Function and state to enable any component to trigger a full app re-render
  const [reRender, setReRender] = useState(0)
  const renderAll = () => {
    setReRender(reRender + 1)
  }

  //// TODO THEMING
  const [theme, setTheme] = useState(`${localStorage.getItem('tasks')?.settings?.globalTheme || 'mako'}`)
  const changeTheme = (theme) => {
    setTheme(theme)
    console.log('changetheme clicked')
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
        
        <Header renderAll={renderAll} changeTheme={changeTheme}/>
        <Tasks renderAll={renderAll}/>
      </div>
    </div>
  )
}

export default App
