import { useState, useMemo, useCallback } from 'react'

import { sortData, filterData, setFiltersHelper } from './helpers'

const defaultSort = {
  by: '',
  order: 'asc',
}

const useTable = (props) => {
  const {
    columns,
    data,
    initialSort = defaultSort,
    initialFilters = [],
  } = props
  const [sort, setSort] = useState(initialSort)
  const [filters, setFilters] = useState(initialFilters)

  const sortedData = useMemo(() => sortData(data, sort), [data, sort])

  const filteredData = useMemo(
    () => filterData(sortedData, columns, filters),
    [sortedData, columns, filters]
  )

  const pageSize = filteredData.length

  const setFilter = useCallback((id, value) => {
    setFilters(setFiltersHelper(id, value))
  }, [])

  const setSortBy = useCallback((sortBy) => {
    setSort((prevSort) => {
      const { by, order } = prevSort
      const isActive = by === sortBy
      const isDesc = order === 'desc'
      const sortOrder = !isActive || isDesc ? 'asc' : 'desc'
      return {
        by: sortBy,
        order: sortOrder,
      }
    })
  }, [])

  return {
    data: filteredData,
    pageSize,
    sort,
    setFilter,
    setSortBy,
  }
}

export default useTable
