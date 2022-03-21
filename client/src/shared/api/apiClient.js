const get = async (path, config) => {
  try {
    const res = await fetch(path, config)

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText)
    } else {
      return res.json()
    }
  } catch (err) {
    throw err
  }
}

const apiClient = {
  get,
}

export default apiClient
