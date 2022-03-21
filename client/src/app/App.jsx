import { QueryClient, QueryClientProvider } from 'react-query'

import WMIPage from '../pages/wmi'
import './App.scss'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <WMIPage />
      </div>
    </QueryClientProvider>
  )
}

export default App
