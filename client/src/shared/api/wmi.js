import apiClient from './apiClient'

export const getWMIList = async () => apiClient.get('wmi')
