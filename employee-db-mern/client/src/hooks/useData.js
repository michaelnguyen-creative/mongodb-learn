import { useState, useEffect, useCallback } from 'react'
const baseUrl = 'http://localhost:5000'

export const useData = (apiEndpoint, skip) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateData = (value) => {
    setData((prev) => ({ ...prev, ...value }))
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    let response = await fetch(`${baseUrl + apiEndpoint}`)
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`
      console.log(message)
      return
    }
    let result = await response.json()
    setData(result)
    setLoading(false)
  }, [apiEndpoint])

  const mutate = async (uri, options) => {
    setLoading(true)
    await fetch(`${baseUrl + uri}`, { ...options })
    await fetchData()
    setLoading(false)
  }

  useEffect(() => {
    if (skip === 'skipFetch') return
    fetchData()
  }, [skip, fetchData])

  return [{ data, loading, updateData }, mutate]
}
