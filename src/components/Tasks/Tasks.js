// Hooks
import { useState } from 'react'

// Components
import Task from '../Task/Task'

// Styles
import './Tasks.css'



const Tasks = ({renderAll}) => {

  


  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
  const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : { currentCategory: 'All' }

  //// Creates an array of all categories based on category proprty of all tasks. By using Set we ensure array of categories does not have duplicates. The Sort ensures 'All' is always the first category, and 'Uncategorized' is always the last category.
  const categories = Array.from(new Set(['All'].concat(tasks.map(task => task.category ? task.category : 'Uncategorized')))).sort( (a, b) => {
    if(a === 'All') return -1
    else if(b === 'All') return 1
    else if(a === 'Uncategorized') return 1
    else return a.localeCompare(b)
  })

  console.log(categories)

  console.log(tasks)


  const [currentCategory, setCurrentCategory] = useState('All')

  const handleCategoryClick = (category) => {
    setCurrentCategory(category)
  }


  return (
    <div className='tasks'>
      <ul className='categories'>
        {categories.map(category => (
            <li
              className={`category btn ${category === currentCategory ? 'current-category' : ''}`} 
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {console.log(category, 'hi hi')}
            </li>
        ))}
      </ul>
      

      <ul>
        {tasks.length >= 1
          ? tasks.sort( (a, b) => a.sortPosition - b.sortPosition)
          .filter(task => {
            if(currentCategory === 'All') {
              return task
            }
            else if(currentCategory === 'Uncategorized') {
              if(task.category === ('' || 'Uncategorized')) return task
            }
            else {
              return task.category === currentCategory
            }
          })
          .map(task => (
          <Task
            key={task.id}
            task={task}
            renderAll={renderAll}
            taskCategory={task.category}
          />
        ))
        : <p className='add-task-msg'>Click the + button to add a task!</p>}
      </ul>


      
    </div>
  )
}

export default Tasks
