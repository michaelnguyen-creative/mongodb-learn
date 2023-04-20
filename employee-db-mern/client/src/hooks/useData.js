import { useState, useEffect, useCallback } from 'react'

export const useData = (baseUrl) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    let response = await fetch(baseUrl)
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`
      console.log(message)
      return
    }
    let result = await response.json()
    setData(result)
    setLoading(false)
  }, [baseUrl])

  const mutate = async (uri, options) => {
    setLoading(true)
    await fetch(`${baseUrl}/${uri}`, { ...options })
    await fetchData()
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [{ data, loading }, mutate]
}
