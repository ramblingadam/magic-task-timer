// Hooks
import { useEffect, useState } from 'react'

// Components
import Task from '../Task/Task'

// Styles
import './Tasks.css'
import { getCategories, getSettings, getTasks } from '../../lib/utils'

const Tasks = ({
  currentCategory,
  setCurrentCategory,
  renderAll,
  convertDateFormat,
  openModal,
  setModalData,
}) => {
  const tasks = getTasks()

  const settings = getSettings()

  let categories = getCategories()

  const handleCategoryClick = (category) => {
    setCurrentCategory(category)
  }

  //// This is called from Task.js when a user changes the category of an item. If there are no more items with the old category, change view/set current category to 'All'
  const checkCurrentCategoryEmpty = (category, newCategory) => {
    const tasks = getTasks()
    const tasksInCategory = tasks.filter(
      (task) => task.category === category
    ).length
    const categories = getCategories()

    if (categories.length <= 1) {
      setCurrentCategory('All')
    } else if (tasksInCategory === 0) {
      newCategory
        ? setCurrentCategory(newCategory)
        : setCurrentCategory(categories[1])
    } else {
      setCurrentCategory(categories[1])
    }

    renderAll()
  }

  return (
    <div className='tasks'>
      <ul
        className={`categories ${categories.length <= 1 ? 'display-none' : ''}`}
      >
        {/* //// If categories array has more categories than just 'All', render category tabs. Otherwise, don't bother. */}
        {categories.length > 1 &&
          categories.slice(1).map((category) => (
            <li
              key={category}
              className={`category text-shadow ${
                category === currentCategory ? 'current-category' : ''
              } ${category === 'Uncategorized' ? 'uncategorized' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.slice(0, 1).toUpperCase() + category.slice(1)}
            </li>
          ))}
      </ul>

      <ul>
        {tasks.length >= 1 ? (
          tasks
            .sort((a, b) => {
              if (currentCategory === 'All')
                return a.sortPosition - b.sortPosition
              else return a.categorySort - b.categorySort
            })
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                tasks={tasks}
                settings={settings}
                renderAll={renderAll}
                currentCategory={currentCategory}
                checkCurrentCategoryEmpty={checkCurrentCategoryEmpty}
                convertDateFormat={convertDateFormat}
                updateCurrentCategory={handleCategoryClick}
                setModalData={setModalData}
                openModal={openModal}
              />
            ))
        ) : (
          <p className='add-task-msg'>Click the + button to add a task!</p>
        )}
      </ul>
    </div>
  )
}

export default Tasks
