import { prependZeroToSingleDigit } from './stringUtils'

const validateDateString = (dateString) => {
  if (typeof dateString !== 'string' || dateString.length !== 10) {
    throw new Error('Date string must be a string of length 10')
  }
  try {
    Date.parse(dateString)
  } catch (error) {
    throw new Error('Invalid date string')
  }
  const splitDateString = dateString.split('-')
  if (splitDateString.length !== 3) {
    throw new Error(
      'Invalid date string: should be split into 3 parts by a dash'
    )
  }
  for (const dateFragment of splitDateString) {
    if (isNaN(+dateFragment))
      throw new Error('Invalid date string: Each part must be a number')
  }
  const [year, month, day] = splitDateString
  if (year.length !== 4 || month.length !== 2 || day.length !== 2)
    throw new Error('Invalid date string: Must match YYYY-MM-DD format')
  if (+month > 12 || +month < 1 || +day > 31 || +day < 1)
    throw new Error('Invalid date string: Invalid month or day')
  return true
}

export const validateTaskHistoryJson = (json) => {
  const tasks = JSON.parse(json)
  if (!Array.isArray(tasks)) throw new Error('Tasks must be an array')
  if (tasks.length === 0) throw new Error('Tasks must not be empty')
  for (const task of tasks) {
    if (
      task.name == undefined ||
      task.category == undefined ||
      task.categorySort == undefined ||
      task.sortPosition == undefined ||
      task.dates == undefined ||
      task.created == undefined
    ) {
      throw new Error(
        'Task must have name, category, categorySort, sortPosition, dates, created'
      )
    }
    try {
      validateDateString(task.created)
    } catch (error) {
      console.warn('Invalid date.created in tasks')
      throw error
    }

    for (const date of task.dates) {
      try {
        validateDateString(date.date)
      } catch (error) {
        console.warn('Invalid date in task.dates')
        throw error
      }

      if (!Number.isInteger(date.time))
        throw new Error('date.time must be an integer')
    }
  }
  return true
}

export const exportTaskHistory = () => {
  const blob = new Blob([localStorage.getItem('tasks')], {
    type: 'application/json',
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  const now = new Date()
  const dateString = `${now.getFullYear()}-${prependZeroToSingleDigit(
    now.getMonth() + 1
  )}-${prependZeroToSingleDigit(now.getDate())}_${prependZeroToSingleDigit(
    now.getHours()
  )}${prependZeroToSingleDigit(now.getMinutes())}${prependZeroToSingleDigit(
    now.getSeconds()
  )}`
  link.download = `MTT_task_history_${dateString}.json`
  link.click()
}

export const getFirstCategory = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'))

  const categories = []
  for (const task of tasks) {
    if (task.category && !categories.includes(task.category)) {
      categories.push(task.category)
    }
  }
  return categories.sort((a, b) => a.localeCompare(b))[0] || 'All'
}

export const isValidCategorySelected = (category) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  let hasCategories = false
  for (const task of tasks) {
    if (task.category && !hasCategories) {
      hasCategories = true
    }
    if (task.category === category) {
      return true
    }
  }
  return (
    (hasCategories && category === 'Uncategorized') ||
    (!hasCategories && category === 'All')
  )
}

export const importTaskHistory = () => {
  if (
    !window.confirm(
      'WARNING: This will overwrite your current task history. All existing tasks will be lost.\n\nTHIS CANNOT BE UNDONE.\n\nTo save your current task history, press cancel, and select Export.'
    )
  )
    return
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = '.json'
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      try {
        validateTaskHistoryJson(reader.result)
        const tasks = JSON.parse(reader.result)
        localStorage.setItem('tasks', JSON.stringify(tasks))
      } catch (error) {
        console.error(error)
        alert('Invalid file format.')
      }
    })
    reader.readAsText(file)
  })
  fileInput.click()
}
