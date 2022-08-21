// Hooks
import { useState } from 'react'
// Styles
import './Footer.css'

// Icons
import { MdHelpOutline,  MdInfoOutline, MdAdd } from 'react-icons/md'
import {FaGithub, FaTwitter, FaLinkedin} from 'react-icons/fa'

const Footer = () => {

  // ! STATE
  const [aboutPanelOpen, setAboutPanelOpen] = useState(false)


  const handleAboutClick = () => {
    setAboutPanelOpen(!aboutPanelOpen)
  }

  // ! ----COMPONENT---
  return (
    <div className='footer-wrapper'>
      
      {/* <div className={`footer-popup ${aboutPanelOpen ? 'footer-popup-reveal' : ''}`}>
          <p>Magic Task Timer © <a className='footer-link' href="adammorsa.com">Adam Morsa</a>. All rights reserved.</p>
          <p><FaGithub />&nbsp;<FaTwitter />&nbsp;<FaLinkedin /></p>
      </div> */}

      <div className='footer-content'>
        
        {/* <div className='footer-left'> */}
      
        {/* </div> */}

        {/* <p className={`footer-about-btn ${aboutPanelOpen ? 'footer-about-btn-active' : ''}`} onClick={handleAboutClick}>
          About&nbsp;<MdInfoOutline />
        </p> */}
       
        <p className='margin-right text-shadow'>© <a className='footer-link footer-underline' href="https://adammorsa.com" target="_blank">Adam Morsa</a>. All rights reserved.</p>
        <ul className='footer-social-links'>
          <li>
            <a href="https://github.com/ramblingadam" className='footer-link' target="_blank">
              <FaGithub className='edit-time-btn margin-right icon-shadow'/>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/ramblingadam" className='footer-link' target="_blank">
              <FaTwitter className='edit-time-btn margin-right icon-shadow'/>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/adam-morsa" className='footer-link' target="_blank">
              <FaLinkedin className='edit-time-btn icon-shadow'/>
            </a>
          </li>
        </ul>
        
      </div>
  

    </div>
  )
}

export default Footer
