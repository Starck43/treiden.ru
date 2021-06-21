//import axios from 'axios'
import useSWR from 'swr'
//import getConfig from 'next/config'

//const config = getConfig().publicRuntimeConfig //next.config.js


/*const getData = response => response.data || {}
const getError = response => response.error || {}
const isSuccess = response => response.success || false

const loadData = async (url) => {
  const result = await axios.get(url)
  const { data: response } = result
  //console.log(result)
  if (isSuccess(response)) {
    return getData(response)
  }
  const error = getError(response)
  console.error(
    `There was an error with code ${error.code}: "${error.message}"`
  )
  return []
}

export default fetchData
*/


const fetchData = async (endpoint) => {
  const response = await fetch(process.env.API_SERVER + endpoint)
  return await response.json()
}

const ajaxFetch = (endpoint='') => {
  return useSWR(endpoint, () => fetchData(endpoint))
}

export default ajaxFetch

