import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const WMIListSearch = (props) => {
  const { onChangeSearch } = props
  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchValue = useCallback(
    (e) => {
      const {
        target: { value },
      } = e
      setSearchValue(value)
      onChangeSearch(value.toLowerCase())
    },
    [onChangeSearch]
  )

  return (
    <div className="wmi-list-search">
      <input
        id="searchInput"
        type="text"
        value={searchValue}
        onChange={handleChangeSearchValue}
        placeholder="Search by name, wmi..."
      />
    </div>
  )
}

WMIListSearch.propTypes = {
  onChangeSearch: PropTypes.func.isRequired,
}

export default WMIListSearch
