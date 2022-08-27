// Style
import './Help.css'

// Hooks
import { useState } from 'react'

// Images
//Local:
// import slide01 from './slides/slide-01.gif'
// import slide02 from './slides/slide-02.gif'
// import slide03 from './slides/slide-03.gif'
// import slide04 from './slides/slide-04.gif'
// import slide05 from './slides/slide-05.gif'
// import slide06 from './slides/slide-06.gif'
// import slide07 from './slides/slide-07.gif'
// import slide08 from './slides/slide-08.gif'
// import slide09 from './slides/slide-09.gif'
// import slide10 from './slides/slide-10.gif'
// import slide11 from './slides/slide-11.gif'
// import slide12 from './slides/slide-12.gif'
// import slide13 from './slides/slide-13.gif'
// import slide14 from './slides/slide-14.gif'
// import slide15 from './slides/slide-15.gif'
// import slide16 from './slides/slide-16.gif'
// import slide17 from './slides/slide-17.png'

//Remote Links(to save netlify bandwidth)
const slide01 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-01.gif'
const slide02 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-02.gif'
const slide03 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-03.gif'
const slide04 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-04.gif'
const slide05 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-05.gif'
const slide06 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-06.gif'
const slide07 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-07.gif'
const slide08 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-08.gif'
const slide09 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-09.gif'
const slide10 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-10.gif'
const slide11 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-11.gif'
const slide12 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-12.gif'
const slide13 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-13.gif'
const slide14 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-14.gif'
const slide15 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-15.gif'
const slide16 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-16.gif'
const slide17 = 'https://raw.githubusercontent.com/ramblingadam/magic-task-timer/main/src/components/Help/slides/slide-17.png'




const Help = (props) => {

  const [currentSlide, setCurrentSlide] = useState(0)


  const slides = [
    {
      header: 'Welcome to Magic Task Timer!',
      desc: 'Take control of how you spend your time by becoming aware of how you spend it.\nTrack the time you spend on projects, tasks, freelancing, getting fit, needlework, chores, socializing, breakdancing, dragon slaying- whatever you want.\nPlease take a moment to review the many incredible features of Magic Task Timer- you won\'t regret it, I guarantee it.*\n*lack of regret not guaranteed. void where prohibited.',
      image: slide01,
      video: '',
    },
    {
      header: 'Add A Task',
      desc: 'This is it. This is your story.\nIt all begins now.\nClick the plus button in the header to add a task.\n',
      image: slide02,
      video: '',
    },
    {
      header: 'Play/Pause Task Timer',
      desc: 'Click a task\'s play button to start the timer for that task. You may have any number of task timers running simultaneously.\nClick it again to stop the timer, which will save the elapsed time to your task for today.\nIf you close or suspend the browser tab while a timer is running, the currently running interval will NOT be saved. Please remember to stop all running timers before closing or suspending the browser tab to ensure you do not lose any time.',
      image: slide04,
      video: '',
    },
    {
      header: 'Sort Your Tasks',
      desc: 'Click the arrows on the left of a task to sort it up or down.',
      image: slide03,
      video: '',
    },
    {
      header: 'Toggle Timer Timeframe',
      desc: 'Click the task timer display to toggle the between \'All Time\' and \'Today\'.',
      image: slide05,
      video: '',
    },
    {
      header: 'View Task History',
      desc: 'The clock icon opens the History pane.\n Hover over a date on the heatmap to see the time spent on your task on that date.\n Click on the History button below the heatmap to reveal the history table.',
      image: slide06,
      video: '',
    },
    {
      header: 'Uh oh...',
      desc: 'Forgot you had the timer running, or didn\'t have access to the app while performing a task?\nNo problem!\n You can manually adjust the time spent on a task for any particular day.\nLucky you.',
      image: slide07,
      video: '',
    },
    {
      header: 'Edit Task History',
      desc: `Select a date by entering it manually or by selecting it on either the heatmap or the history table.\nEnter a number of hours and/or minutes into the form.\nThen, use the big friendly buttons to add to, subtract from, overwrite, or completely delete the logged time for that date.\n`,
      image: slide08,
      video: '',
    },
    {
      header: 'Close History View',
      desc: 'You can close the History pane by clicking the clock icon again.',
      image: slide09,
      video: '',
    },
    {
      header: 'Edit Task Name',
      desc: 'The pencil icon allows you to change the name of a task.',
      image: slide10,
      video: '',
    },
    {
      header: 'Categories',
      desc: 'The folder icon allows you to assign a the task to a category. Each task may have one category.\nA tab will appear along the top of your tasks list for each category. Click on a tab to show the tasks in that category.\nTo remove a task\'s category, click the folder icon, erase all text in the Change Category prompt, and press OK.',
      image: slide11,
      video: '',
    },
    {
      header: 'Emojis',
      desc: 'Protip: You can use any standard Unicode emojis in your task or category names.\nMake those tasks pop with emoji icons!',
      image: slide17,
      video: '',
    },
    {
      header: 'Delete Task',
      desc: 'Click the trash icon to permanently delete a task and all time logged for it.\nTo delete ALL of your data forever and ever, clear your browser cache.\nSometimes, it\'s just not meant to be.\nC\'est la vie.\n',
      image: slide16,
      video: '',
    },
    {
      header: 'Dividers',
      desc: 'You can also add horizontal dividers into your task lists by creating a task with the name \'divider\'.\nDividers can be sorted and deleted just like tasks.\nFor that extra exquisite extra li\'l bit of organization to keep your many projects nice and tidy.\nGive it a try!',
      image: slide12,
      video: '',
    },
    {
      header: 'Settings',
      desc: 'Click the Settings button to personalize your Magic Task Timer experience with theming and other exciting options.*\n\n\n\n*options may not be exciting',
      image: slide13,
      video: '',
    },
    {
      header: 'Help',
      desc: 'Fear not, brave task warrior!\nIf you ever forget anything, you can view this tutorial at any time by clicking the Help button.',
      image: slide14,
      video: '',
    },
    {
      header: 'Enjoy!',
      desc: 'I hope you find this app useful!\nIf so, share it with your friends, and reach out with feedback via Twitter or Github!\n(Links can be found in the footer)',
      image: slide15,
      video: '',
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

  // ! COMPONENT
  return (
    <div className='help-window-wrapper'>
        <div className='slide'>

          <h1 className='slide-header'>
            {slides[currentSlide].header}
          </h1>

          <div className='slide-content'>
            
            <div className='slide-img-wrapper'>
              <img className='slide-img' src={slides[currentSlide].image} alt="" onClick={() => navigateSlides('next')}/>
              {/* <video src={slides[currentSlide].video} autoPlay loop></video> */}
            </div>

            <div className='slide-desc' onClick={() => navigateSlides('next')}>
              {slides[currentSlide].desc.split('\n').map(sentence => (
                <p className='slide-desc-sentence'>
                  {sentence}
                </p>
              ))}
            </div>

          </div>

          <div className='slide-nav-wrapper'>
          <ul className='slide-nav'>
            {slides.map((slide, i) => (
              <li className={`slide-nav-item dot ${currentSlide === i ? 'current-dot' : ''}`} onClick={() => navigateSlides(i)} title={slide.header}>&#9679;</li>
            ))}
          </ul>

          <ul className='slide-nav nav-btns'>            
            <li
              className={` btn-help btn-prev btn-nav center ${
                  currentSlide === 0 ? 'disabled' : ''
                }`}
              onClick={() => navigateSlides('prev')}
              >
                Prev
            </li>
            <li
              className='btn-help btn-skip btn-nav center'
              onClick={props.toggleHelpOpen}>
              Skip
            </li>
            <li
              className={`btn-help center btn-next btn-nav  ${
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
          </div>
          
        </div>

      <div className='img-preloader'>
        {slides.map(slide => (
          <div>
            <img src={slide.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Help
