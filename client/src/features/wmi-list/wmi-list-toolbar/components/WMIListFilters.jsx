import React from 'react'
import PropTypes from 'prop-types'

const WMIListFilters = (props) => {
  const { filterLists, onChangeFilter } = props
  const filterListKeys = Object.keys(filterLists)
  return (
    <div className="wmi-list-filters">
      {filterListKeys.map((key) => {
        const list = filterLists[key]
        return (
          <select key={key} id={key} onChange={onChangeFilter}>
            {['View All', ...list].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )
      })}
    </div>
  )
}

WMIListFilters.propTypes = {
  filterLists: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default WMIListFilters
