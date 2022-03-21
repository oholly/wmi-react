import { memo } from 'react'
import PropTypes from 'prop-types'

import Search from './components/WMIListSearch'
import Filters from './components/WMIListFilters'

const WMIListToolbar = (props) => {
  const { onChangeSearch, filterLists, onChangeFilter } = props
  return (
    <div className="wmi-list-toolbar">
      <Search onChangeSearch={onChangeSearch} />
      <Filters filterLists={filterLists} onChangeFilter={onChangeFilter} />
    </div>
  )
}

WMIListToolbar.propTypes = {
  onChangeSearch: PropTypes.func,
  filterListKeys: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onChangeFilter: PropTypes.func,
}

export default memo(WMIListToolbar)
