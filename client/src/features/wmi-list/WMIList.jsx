import { useCallback, useMemo } from 'react'

import { useWMILIst } from '../../entities/wmi/hooks'
import { useTable } from '../../shared/hooks'
import { debounce } from '../../shared/utils/func'
import { format } from '../../shared/utils/date'

import Toolbar from './wmi-list-toolbar'
import Table from './wmi-list-table'

import { getFilterLists } from './helpers'
import './WMIList.scss'

const columns = [
  {
    id: 'name',
    label: 'Name',
    filterType: 'text',
    filterFn: (item, value) => {
      const { name, wmi } = item
      const lowerCaseName = name.toLowerCase()
      const lowerCaseWMI = wmi.toLowerCase()
      const isMatchName = lowerCaseName.includes(value)
      const isMatchWMI = lowerCaseWMI.includes(value)
      const result = isMatchName || isMatchWMI
      return result
    },
  },
  {
    id: 'wmi',
    label: 'WMIList',
  },
  {
    id: 'country',
    label: 'Country',
    filterType: 'select',
  },
  {
    id: 'createdOn',
    label: 'Created At',
    formatter: (value) => format(new Date(value), 'yyyy-MM-dd'),
  },
  {
    id: 'vehicleType',
    label: 'Vehicle Type',
    filterType: 'select',
  },
]

const initialSort = {
  by: 'createdOn',
  order: 'desc',
}

const WMIList = () => {
  const { isLoading, data: wmiList } = useWMILIst()
  const { data, pageSize, sort, setFilter, setSortBy } = useTable({
    columns,
    data: wmiList,
    initialSort,
  })

  const filterLists = useMemo(() => getFilterLists(wmiList, columns), [wmiList])

  const handleChangeSearch = useMemo(
    () =>
      debounce((value) => {
        setFilter('name', value)
      }, 300),
    [setFilter]
  )

  const handleChangeFilter = useCallback(
    (e) => {
      const {
        target: { id, value },
      } = e
      const validValue = value === 'View All' ? '' : value
      setFilter(id, validValue)
    },
    [setFilter]
  )

  return (
    <div className="wmi-list">
      <div className="wmi-list-header">
        <h2>
          WMI - Honda <span>{pageSize}</span>
        </h2>
      </div>
      <Toolbar
        onChangeSearch={handleChangeSearch}
        filterLists={filterLists}
        onChangeFilter={handleChangeFilter}
      />
      <Table
        columns={columns}
        isLoading={isLoading}
        data={data}
        pageSize={pageSize}
        sort={sort}
        setSortBy={setSortBy}
      />
    </div>
  )
}

export default WMIList
