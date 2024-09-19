import axios from "axios"
export const DomainUrl="http://www.hgtang.com"

export const BaseUrl=(import.meta.env.MODE==="development")?"http://localhost:8000":"http://101.43.50.164:8080"
export const websocketUrl=(import.meta.env.MODE==="development")?"ws://localhost:8000":"ws://101.43.50.164:8080"
export const request = axios.create({
  baseURL: BaseUrl,
  timeout: 60000
})

// export const BaseUrl='http://localhost:8000'
// export const websocketUrl="ws://localhost:8000"