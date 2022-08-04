// Styles
import './DialogBox.css'
// Hooks

const DialogBox = () => {
  return (
    <div className='dialog-box-wrapper'>

      <div className='dialog-box'>
        <p>Are you sure?</p>
        <button>Yes</button>
        <button>No</button>
      </div>

    </div>
  )
}

export default DialogBox
