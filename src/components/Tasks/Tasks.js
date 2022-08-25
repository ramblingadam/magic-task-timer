// Hooks
import { useEffect, useState } from 'react'

// Components
import Task from '../Task/Task'

// Styles
import './Tasks.css'



const Tasks = (props) => {

  


  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

  const getTasks = () => {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
  }
  const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : { currentcategory: 'All' }



  //// Creates an array of all categories based on category proprty of all tasks. By using Set we ensure array of categories does not have duplicates. The Sort ensures 'All' is always the first category, and 'Uncategorized' is always the last category.
  // const categories = Array.from(new Set(['All'].concat(tasks.map(task => task.category ? task.category : 'Uncategorized')))).sort( (a, b) => {
  //   if(a === 'All') return -1
  //   else if(b === 'All') return 1
  //   else if(a === 'Uncategorized') return 1
  //   else if(b === 'Uncategorized') return -1
  //   else return a.localeCompare(b)
  // })
 

  const getCategories = () => {
    const categories = Array.from(new Set(['All'].concat(getTasks().map(task => task.category ? task.category : 'Uncategorized')))).sort( (a, b) => {
      if(a === 'All') return -1
      else if(b === 'All') return 1
      else if(a === 'Uncategorized') return 1
      else if(b === 'Uncategorized') return -1
      else return a.localeCompare(b)
    })
    if(categories.filter(category => category !== 'All' && category !== 'Uncategorized').length === 0) {
      categories.pop()
    }
    return categories

  }

  let categories = getCategories()

  //// If user has no categorized tasks, trim categories array to only have 'All'.
  // if(categories.filter(category => category !== 'All' && category !== 'Uncategorized').length === 0) {
  //   categories.pop()
  // }

  // console.log(categories)

  // console.log(tasks)

  //// currentCategory handling. 'Uncategorized' by default.
  const [currentCategory, setCurrentCategory] = useState(settings.currentcategory || 'Uncategorized')
  const handleCategoryClick = (category) => {
    // props.changeGlobalCategory(currentCategory)
    setCurrentCategory(category)
    // console.log('from tasks: ', currentCategory)
    // setTimeout(() => console.log(currentCategory), 1000)

  }

  //// Updates the global category whenever the category is changed locally.
  useEffect(() => {
    props.changeGlobalCategory(currentCategory)
  }, [currentCategory])

  //// This is called from Task.js when a user changes the category of an item. If there are no more items with the old category, change view/set current category to 'All'
  const checkCurrentCategoryEmpty = (category, newCategory) => {    
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const tasksInCategory = tasks.filter(task => task.category === category).length
    const categories = getCategories()
    // console.log('entering checkifempty with cat', category, 'and new cat', newCategory)
    // console.log(tasks)
 
    // console.log(categories, category)
    // console.log('tasks in', category, ':', tasksInCategory)
    
    // setTimeout(() => {console.log(categories)}, 500) 

    if(categories.length <= 1) {
      // console.log('only categories are all and uncategorized, ostensibly')
      setCurrentCategory('All')
    } else if(tasksInCategory === 0) {
      newCategory ? setCurrentCategory(newCategory) : setCurrentCategory(categories[1])
    } else {
      // setCurrentCategory('Uncategorized')
    }

    // if(tasksInCategory === 0) {
    //   console.log('old category is empty')
    //   if(categories.length <= 1) {
    //     console.log('only categories are all and uncategorized, ostensibly')
    //     setCurrentCategory('All')
    //   // } else setCurrentCategory(categories[1])
    //   } else {
    //     console.log('more than 2 category remaining')
    //     newCategory ? setCurrentCategory(newCategory) : setCurrentCategory(categories[1])
    //   }
      
    // }

    props.renderAll()
    // setTimeout(() => {console.log('current cat is ', currentCategory)}, 1000) 
    // console.log('--------------------')
  }


  return (
    <div className='tasks'>
      <ul className={`categories ${categories.length <= 1 ? 'display-none': ''}`}>
        {/* //// If categories array has more categories than just 'All', render category tabs. Otherwise, don't bother. */}
        {categories.length > 1 && categories.slice(1).map(category => (
            <li
              key={category}
              className={`category text-shadow ${category === currentCategory ? 'current-category' : ''} ${category === 'Uncategorized' ? 'uncategorized' : ''}`} 
              onClick={() => handleCategoryClick(category)}
            >
              {category.slice(0,1).toUpperCase() + category.slice(1)}
            </li>
        ))}
      </ul>
      

      <ul>
        {tasks.length >= 1
          // ? tasks.filter(task => {
          //   if(currentCategory === 'All') {
          //     return task
          //   }
          //   else if(currentCategory === 'Uncategorized') {
          //     return task.category === ''
          //   }
          //   else {
          //     return task.category === currentCategory
          //   }
          // })
          // .sort( (a,b) => {
          //   if(currentCategory === 'All') return a.sortPosition - b.sortPosition
          //   else return a.categorySort - b.categorySort
          // })
          ? tasks.sort( (a,b) => {
            if(currentCategory === 'All') return a.sortPosition - b.sortPosition
            else return a.categorySort - b.categorySort
          })
          .map(task => (
          <Task
            key={task.id}
            task={task}
            tasks={tasks}
            settings={settings}
            renderAll={props.renderAll}
            currentCategory={currentCategory}
            checkCurrentCategoryEmpty={checkCurrentCategoryEmpty}
            convertDateFormat={props.convertDateFormat}
            updateCurrentCategory={handleCategoryClick}
    
          />
        ))
        : <p className='add-task-msg'>Click the + button to add a task!</p>}
      </ul>


      
    </div>
  )
}

export default Tasks
