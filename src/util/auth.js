/*
  Manage Token.
   token结构 @return {
        access_token: 'access_token', // 用于检验身份的token
        refresh_token: 'refresh_token', // 用于刷新的token
        expires_at: 'expires_at', // token过期时间
    }
*/
import { setStorage, getStorage } from '../../util/storage'

// 获取检验的token
export async function getToken() {
    const token = await getTokenData()
    if (!token) return ''
    return token.access_token
}

// 获取刷新的token
export async function getRefreshToken() {
    const token = await getTokenData()
    if (!token) return ''
    return token.refresh_token
}

// 保存token
export async function setToken(token = {}) {
    // expires_in 有效时间
    if (token.expires_in) {
        token.expires_at = Date.now() + token.expires_in * 1000;
    }
    return await setStorage('token', token)
}

/*
    判断token是否过期
    @return bool: true 有效期内；false: 已过期
*/
export async function checkTokenExpired() {
    const token = await getTokenData()
    if (token && token.expires_at) {
        const expires_time = 60 * 5 * 1000 // 设置过期时间为 3分钟
        const isExpired = expires_at < (Date.now() + expires_time)
        return isExpired
    } else {
        return false
    }
}


// 获取缓存中token
async function getTokenData() {
    const token = await getStorage('token')
    return token
}

