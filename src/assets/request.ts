import axios from 'axios'

export  const request = axios.create({
  baseURL: "http://101.43.50.164:8080",
  timeout: 60000
})
export const BaseUrl="http://101.43.50.164:8080"


// export const request = axios.create({
//   baseURL: 'http://localhost:8000',
//   timeout: 60000
// })
// export const BaseUrl='http://localhost:8000'
