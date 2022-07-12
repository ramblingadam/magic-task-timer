// Components
import Header from "./Header/Header"
import Tasks from './Tasks/Tasks'

// Hooks
import { useState } from "react"

const App = () => {

  // Function and state to enable any component to trigger a full app re-render
  const [reRender, setReRender] = useState(0)
  const renderAll = () => {
    setReRender(reRender + 1)
  }

  return (
    <div className="app">
      <Header renderAll={renderAll}/>
      <Tasks renderAll={renderAll}/>
    </div>
  )
}

export default App
