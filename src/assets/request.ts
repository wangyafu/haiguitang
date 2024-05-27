import axios from 'axios'
/*export  const request = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_URL,
  timeout: 50000
})
export const BaseUrl=import.meta.env.VUE_APP_BASE_URL
*/
export const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 50000
})
export const BaseUrl='http://localhost:8000'