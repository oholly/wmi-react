import PropTypes from 'prop-types'
import clsx from 'clsx'

const renderHeaderCells = (columns, sort, setSortBy) => {
  return columns.map(({ id, label }) => {
    const isActiveSort = sort.by === id
    const isDesc = isActiveSort && sort.order === 'desc'
    return (
      <th key={id}>
        <button
          className={clsx({ active: isActiveSort })}
          onClick={() => {
            setSortBy(id)
          }}
        >
          <span className="text">{label}</span>
          <span className="arrow">{!isDesc ? '\u2193' : '\u2191'}</span>
        </button>
      </th>
    )
  })
}

const renderRows = (columns, data) => {
  return data.map((d) => {
    const wmi = d.wmi
    return (
      <tr key={wmi}>
        {columns.map(({ id, formatter }) => {
          const value = d[id]
          const formattedValue = formatter ? formatter(value) : value
          return <td key={id}>{formattedValue}</td>
        })}
      </tr>
    )
  })
}

const WMIListTable = (props) => {
  const { columns, isLoading, data, sort, setSortBy } = props

  return (
    <div className="wmi-list-table">
      {isLoading ? (
        '...Loading'
      ) : (
        <table>
          <thead>
            <tr>{renderHeaderCells(columns, sort, setSortBy)}</tr>
          </thead>
          <tbody>{renderRows(columns, data)}</tbody>
        </table>
      )}
    </div>
  )
}

WMIListTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filterType: PropTypes.oneOf(['text', 'select']),
      filterFn: PropTypes.func,
      formatter: PropTypes.func,
    }).isRequired
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      country: PropTypes.string,
      wmi: PropTypes.string,
      createdOn: PropTypes.string,
      vehicleType: PropTypes.string,
    }).isRequired
  ).isRequired,
  sort: PropTypes.shape({
    by: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  }).isRequired,
  setSortBy: PropTypes.func.isRequired,
}

export default WMIListTable
