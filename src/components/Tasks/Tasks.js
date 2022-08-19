// Hooks
import { useEffect, useState } from 'react'

// Components
import Task from '../Task/Task'

// Styles
import './Tasks.css'



const Tasks = (props) => {

  


  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
  const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : { currentcategory: 'All' }



  //// Creates an array of all categories based on category proprty of all tasks. By using Set we ensure array of categories does not have duplicates. The Sort ensures 'All' is always the first category, and 'Uncategorized' is always the last category.
  const categories = Array.from(new Set(['All'].concat(tasks.map(task => task.category ? task.category : 'Uncategorized')))).sort( (a, b) => {
    if(a === 'All') return -1
    else if(b === 'All') return 1
    else if(a === 'Uncategorized') return 1
    else if(b === 'Uncategorized') return -1
    else return a.localeCompare(b)
  })

  //// If user has no categorized tasks, trim categories array to only have 'All'.
  if(categories.filter(category => category !== 'All' && category !== 'Uncategorized').length === 0) {
    categories.pop()
  }

  // console.log(categories)

  // console.log(tasks)

  //// currentCategory handling. 'All' by default.
  const [currentCategory, setCurrentCategory] = useState(settings.currentcategory || 'Uncategorized')
  const handleCategoryClick = (category) => {
    // props.changeGlobalCategory(currentCategory)
    setCurrentCategory(category)
    // console.log('from tasks: ', currentCategory)
    // setTimeout(() => console.log(currentCategory), 1000)

  }

  useEffect(() => {
    props.changeGlobalCategory(currentCategory)
  }, [currentCategory])

  //// This is called from Task.js when a user changes the category of an item. If there are no more items with the old category, change view/set current category to 'All'
  // const checkCurrentCategoryEmpty = (category) => {    
  //   const tasks = JSON.parse(localStorage.getItem('tasks'))
  //   const tasksInCategory = tasks.filter(task => task.category === category).length
  //   if(tasksInCategory === 0) {
  //     setCurrentCategory('All')
  //   }
  // }
  // TODO Default back to Uncategorized instead of 'All'
  const checkCurrentCategoryEmpty = (category) => {    
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const tasksInCategory = tasks.filter(task => task.category === category).length
    if(tasksInCategory === 0) {
      setCurrentCategory('Uncategorized')
    }
  }


  return (
    <div className='tasks'>
      <ul className={`categories ${categories.length <= 1 ? 'display-none': ''}`}>
        {/* //// If categories array has more categories than just 'All', render category tabs. Otherwise, don't bother. */}
        {categories.length > 1 && categories.slice(1).map(category => (
            <li
              key={category}
              className={`category btn text-shadow ${category === currentCategory ? 'current-category' : ''} ${category === 'Uncategorized' ? 'uncategorized' : ''}`} 
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
    
          />
        ))
        : <p className='add-task-msg'>Click the + button to add a task!</p>}
      </ul>


      
    </div>
  )
}

export default Tasks
