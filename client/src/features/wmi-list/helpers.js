export const getFilterLists = (data, columns) => {
  const { keys, initialSets } = columns.reduce(
    (acc, col) => {
      const { id, filterType } = col
      if (filterType === 'select') {
        return {
          ...acc,
          keys: [...acc.keys, id],
          initialSets: { ...acc.initialSets, [id]: new Set() },
        }
      }
      return acc
    },
    { keys: [], initialSets: {} }
  )
  const uniqueSets = data.reduce((acc, item) => {
    keys.forEach((key) => {
      const value = item[key]
      if (value) {
        acc[key].add(value)
      }
    })
    return acc
  }, initialSets)
  const lists = keys.reduce((acc, key) => {
    const set = uniqueSets[key]
    return {
      ...acc,
      [key]: [...set],
    }
  }, {})
  return lists
}
