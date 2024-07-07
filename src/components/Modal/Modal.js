import { useModal } from '../../hooks/useModal'
import './Modal.css'

const Modal = ({ isOpen, close, children, modalData }) => {
  const { title, message, onAccept, yesText, noText } = modalData
  return (
    <div
      className={`modal-wrapper ${isOpen ? 'visible' : ''}`}
      onClick={close}
    >
      <div
        className='modal-content text-shadow'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='modal-header'>
          <div className='modal-title'>{title}</div>
        </div>

        <div className='modal-body'>{message()}</div>

        <div className='modal-btns'>
          <div
            className='modal-btn modal-btn-cancel'
            onClick={close}
            tabIndex={1}
          >
            {noText || 'Cancel'}
          </div>
          <div
            className='modal-btn modal-btn-confirm'
            onClick={onAccept}
            tabIndex={1}
          >
            {yesText || 'Confirm'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
