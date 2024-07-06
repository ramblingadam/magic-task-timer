export const getTasks = () => {
  return localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks'))
    : []
}

export const getCategories = () => {
  //// Creates an array of all categories based on category proprty of all tasks. By using Set we ensure array of categories does not have duplicates. The Sort ensures 'All' is always the first category, and 'Uncategorized' is always the last category.
  const categories = Array.from(
    new Set(
      ['All'].concat(
        getTasks().map((task) =>
          task.category ? task.category : 'Uncategorized'
        )
      )
    )
  ).sort((a, b) => {
    if (a === 'All') return -1
    else if (b === 'All') return 1
    else if (a === 'Uncategorized') return 1
    else if (b === 'Uncategorized') return -1
    else return a.localeCompare(b)
  })
  if (
    categories.filter(
      (category) => category !== 'All' && category !== 'Uncategorized'
    ).length === 0
  ) {
    categories.pop()
  }
  return categories
}

export const getSettings = () => {
  return localStorage.getItem('settings')
    ? JSON.parse(localStorage.getItem('settings'))
    : { currentcategory: 'All' }
}
