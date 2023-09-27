import axios from 'axios'
import { message } from 'antd'

export type DataType = {
  [key: string]: any
}

export type ResType = {
  error: number
  data?: DataType
}

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use((res) => {
  const { data, error } = (res.data || {}) as ResType
  if (error !== 0) {
    message.error('又错误')
    throw new Error('又错误')
  }
  return data as any
})

export default instance
