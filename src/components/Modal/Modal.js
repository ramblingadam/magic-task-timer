import { useModal } from '../../hooks/useModal'
import { useState, useEffect, useRef } from 'react'
import './Modal.css'

const Modal = ({ close, modalData }) => {
  const { title, message, onAccept, yesText, noText, isDestructiveAction } =
    modalData

  const [isDisabled, setIsDisabled] = useState(isDestructiveAction)

  const modalRef = useRef()

  useEffect(() => {
    let fadeinTimeout = setTimeout(() => {
      modalRef.current.classList.add('visible')
    }, 1)

    let enableTimeout = null
    if (isDestructiveAction) {
      enableTimeout = setTimeout(() => setIsDisabled(false), 3500)
    }

    return () => {
      clearTimeout(fadeinTimeout)
      clearTimeout(enableTimeout)
    }
  }, [])
  return (
    <div
      className={`modal-wrapper`}
      onClick={close}
      ref={modalRef}
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

        <div className='modal-body'>
          {typeof message === 'function' ? message() : message}
        </div>

        <div className='modal-btns'>
          <div
            className={`modal-btn ${
              isDestructiveAction ? 'modal-btn-confirm' : 'modal-btn-cancel'
            }`}
            onClick={close}
            tabIndex={1}
          >
            {noText || 'Cancel'}
          </div>
          <div
            className={`modal-btn ${
              isDestructiveAction ? 'modal-btn-cancel' : 'modal-btn-confirm'
            } ${isDisabled ? 'disabled' : ''}`}
            onClick={
              isDisabled
                ? () => {}
                : () => {
                    onAccept()
                    close()
                  }
            }
            tabIndex={1}
          >
            {isDisabled ? 'Wait...' : yesText || 'Confirm'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
