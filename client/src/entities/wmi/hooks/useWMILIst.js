import { useQuery } from 'react-query'

import api from '../../../shared/api'

const useWMIList = () => {
  const { isLoading, data = [] } = useQuery('wmi', api.wmi.getWMIList)
  return { isLoading, data }
}

export default useWMIList
