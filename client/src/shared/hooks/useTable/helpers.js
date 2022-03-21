export const sortData = (data, sort) => {
  const { by, order } = sort
  const clonedData = [...data]
  const isDesc = order === 'desc'

  return clonedData.sort((a, b) => {
    const A = a[by]
    const B = b[by]

    if (A === B) {
      return 0
    }
    if (!A) {
      return 1
    }
    if (!B) {
      return -1
    }
    if (!isDesc) {
      return A < B ? -1 : 1
    }
    return A < B ? 1 : -1
  })
}

export const filterResolverFn = (key, value, comparisonFn) => (item) => {
  const itemValue = item[key]
  if (comparisonFn) {
    return comparisonFn(itemValue, value)
  }
  return itemValue === value
}

export const filterData = (data, columns, filters = []) => {
  if (filters.length) {
    const filterTypes = columns.reduce((acc, col) => {
      const { id, filterType, filterFn } = col
      return {
        ...acc,
        [id]: { filterType, filterFn },
      }
    }, {})
    return filters.reduce((acc, filter) => {
      const { id, value: filterValue } = filter
      const { filterType, filterFn } = filterTypes[id]

      if (filterFn) {
        return acc.filter((item) => filterFn(item, filterValue))
      }
      if (filterValue) {
        switch (filterType) {
          case 'text': {
            return acc.filter(
              filterResolverFn(id, filterValue, (a, b) => {
                const lowerCaseA = a.toLowerCase()
                const lowerCaseB = b.toLowerCase()
                const isMatch = lowerCaseA.includes(lowerCaseB)
                return isMatch
              })
            )
          }
          case 'select': {
            return acc.filter(filterResolverFn(id, filterValue))
          }
          default:
            return data
        }
      }
      return data
    }, data)
  }
  return data
}

export const setFiltersHelper = (id, value) => (previousFilters) => {
  const isExist = previousFilters.find((item) => item.id === id)
  if (isExist) {
    return previousFilters.map((item) => {
      if (item.id === id) {
        return { ...item, value }
      }
      return item
    })
  }
  return [...previousFilters, { id, value }]
}
