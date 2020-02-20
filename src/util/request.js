
/* 
  Requests a URL, returning a promise.
    @param {url} 路由
    @param {options} 请求头信息
    @param {local} 是否缓存本地数据（若未过期将在第二次请求时使用本地数据而不发起请求）
*/
import { getToken } from './auth'
import { getServicesUrl } from './util'

export default async function request(url, options = {}, local = false) {
  const token = await getToken() // 获取token

  const defaultOptions = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-AUTH-ACCESS-TOKEN": token, // TOKEN
      // "X-AGENT-VERSION": Constants.manifest.version, // 客户端版本
    }
  }

  const requestOptions = { ...defaultOptions, ...options }
  const { method, body, headers } = requestOptions
  if (method === 'POST' || method === 'PUT') {
    // 非表单数据
    if (!body instanceof FormData) {
      requestOptions.headers = {
        "Content-Type": "application/json; charset=utf-8",
        ...headers
      }
      requestOptions.body = JSON.stringify(body)
    }
  }
  if (!/^(http|https)/.test(url)) {
    // 不是以http/https 开头的url
    url = getServicesUrl(url)
  }
  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        if (method === "DELETE" || response.status === 204) {
          return response.text();
        }
        return response.json()
      }
      throw new Error('Network response was not work.')
    })
    .then(responseJson => {
      if (typeof responseJson !== "string" && responseJson.code === 100001) {
        throw new Error(`json response was error. ${responseJson.message}`)
      }
      return responseJson
    }).catch(e => {
      console.log('error info :', e)
    })
}