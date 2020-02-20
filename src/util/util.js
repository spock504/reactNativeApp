import {config} from '../config/config'

// 获取路由地址
export function getServicesUrl(path) {
    let url = `${config.API_URL}/${path}`
    return url
  }