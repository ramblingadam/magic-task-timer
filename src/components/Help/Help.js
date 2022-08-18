// Style
import './Help.css'

// Hooks
import { useState } from 'react'

// Images



const Help = (props) => {

  const [currentSlide, setCurrentSlide] = useState(0)


  const slides = [
    {
      header: 'Welcome to Magic Task Timer!',
      desc: 'A personal timeclock to track the time you spend on projects, tasks, and goals.\n Please take a moment to review the many incredible features of Magic Task Timer- you won\'t regret it!',
      image: ''
    },
    {
      header: 'Add A Task',
      desc: 'Click the green plus button in the header to add a task.\n Gotta start somewhere.',
      image: ''
    },
    {
      header: 'Sort Your Tasks',
      desc: 'Click the arrows on the left to sort your tasks up and down.\n Tasks have separate sorting orders within their own categories, if assigned.',
      image: ''
    },
    {
      header: 'Toggle Timer Timeframe',
      desc: 'Click the task time to toggle the timer\'s display between \'All Time\' and \'Today\'.',
      image: ''
    },
    {
      header: 'Play/Pause Task Timer',
      desc: 'Click the play button to start the timer.\n Click it again to stop the timer and save the elapsed time to your task for today.',
      image: ''
    },
    {
      header: 'View Task History',
      desc: 'The clock icon opens the History pane.\n Hover over a date on the heatmap to see the time spent on your task on that date.\n Click on the History button below the heatmap to reveal the history table.',
      image: ''
    },
    {
      header: 'Edit Task History',
      desc: 'Forgot you had the timer running, or didn\'t have access to the app while performing a task? No problem!\n You can manually adjust the time spent on a task for any particular day.\n Somebody\'s got to keep the record straight!',
      image: ''
    },
    {
      header: 'Edit Task History',
      desc: `Select a date by entering it manually or by selecting it on either the heatmap or the history table.\n Then, use the big buttons to adjust the total time for that date.`,
      image: ''
    },
    // {
    //   header: 'Manual Adjustments 2',
    //   desc: `Select a date by entering it manually or by selecting it on either the heatmap or the history table. Then, use the big buttons to adjust the time spent on that date- <span className='green'>adding</span> or <span className='red'>subtracting</span> from the recorded total, <span className='yellow'>setting/overwriting</span> the recorded total with a specific time, or <span className='red'>deleting</span> the time spent on that day entirely.`,
    //   image: ''
    // },
    {
      header: 'Close History View',
      desc: 'You can close the History pane by clicking the clock icon again.',
      image: ''
    },
    {
      header: 'Edit Task Name',
      desc: 'The pencil icon allows you to change the name of a task.\n Make it something exciting!',
      image: ''
    },
    {
      header: 'Categories',
      desc: 'Organize your tasks with Categories!\n The folder icon allows you to assign a task to a category.\n A tab will appear along the top of your tasks list for each category.\n A place for everything, and everything in its place.',
      image: ''
    },
    {
      header: 'Settings',
      desc: 'Click the Settings button to personalize your Magic Task Timer experience with theming and other exciting options.',
      image: ''
    },
    {
      header: 'One more time...?',
      desc: 'Fear not, task warrior!\n If you ever forget anything, you can view this information at any time by clicking the Help button.',
      image: ''
    },
    {
      header: 'Enjoy!',
      desc: 'I hope you find this app useful!\n If so, share it with your friends, and let me know on Twitter, Github, or LinkedIn!\n(All links open in a new window)',
      image: ''
    },
  ]

  const navigateSlides = (slide) => {
    if(slide === 'next') {
      // If we are at last slide, ignore input.
      if(currentSlide === slides.indexOf(slides[slides.length - 1])) {
        return
      }
      setCurrentSlide(currentSlide + 1)
    } else if(slide === 'prev') {
      // If we are at first slide, ignore input.
      if(currentSlide === 0) {
        return
      }
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(slide)
    }
  }

  return (
    <div className='help-window-wrapper text-shadow'>
      {/* <h1 className='help-header'>Welcome to Magic Task Timer!</h1>
      <h3>Please take a moment to review the app's features below.</h3> */}
      {/* <ul className='slides'> */}
        {/* {slides.map(slide => (
          <li className='slide'>
          <h3>{slide.header}</h3>
          <img src={slide.image} alt="" />
          <p>
            {slide.desc}
          </p>
        </li>
        ))} */}
        <div className='slide'>
          <h1 className='slide-header'>
            {slides[currentSlide].header}
          </h1>

          <img className='slide-img' src={slides[currentSlide].image} alt="" onClick={() => navigateSlides('next')}/>

          <ul className='slide-nav'>
            {/* <li className='slide-nav-item' onClick={() => navigateSlides('prev')}>
              Prev
            </li> */}

            {slides.map((slide, i) => (
              <li className={`slide-nav-item dot ${currentSlide === i ? 'current-dot' : ''}`} onClick={() => navigateSlides(i)} title={slide.header}>&#9679;</li>
            ))}

            {/* <li onClick={() => navigateSlides('next')}>
              Next
            </li> */}
          </ul>

          <p className='slide-desc' onClick={() => navigateSlides('next')}>
            {slides[currentSlide].desc.split('\n').map(sentence => (
              <p className='slide-desc-sentence'>{sentence}</p>
            ))}
          </p>

          
          <ul className='slide-nav nav-btns'>
          <li
            className={`btn btn-history btn-prev btn-nav center ${
                currentSlide === 0 ? 'disabled' : ''
              }`}
            onClick={() => navigateSlides('prev')}
            >
              Prev
            </li>
            <li
              className='btn btn-history btn-skip btn-nav center'
              onClick={props.toggleHelpOpen}>
              Skip
            </li>
            <li
              className={`btn btn-history center btn-next btn-nav  ${
                currentSlide === slides.indexOf(slides[slides.length - 1]) ? 'next-done': ''
              }`}
              onClick={
                () => {
                if(currentSlide === slides.indexOf(slides[slides.length - 1])) props.toggleHelpOpen()
                else navigateSlides('next')
              }}
            >
              {currentSlide === slides.indexOf(slides[slides.length - 1]) ? 'Start!': 'Next'}
            </li>
          </ul>
          {/* <p className='btn btn-history btn-skip' onClick={props.toggleHelpOpen}>Skip</p> */}
        </div>
      {/* </ul> */}
    </div>
  )
}

export default Help
