import { setStorage, getStorage } from '../../util/storage'

//  创建一个本地缓存事件类
export default class DataStorage {
    /* 
        获取数据:
        先从本地获取数据, 检查过期时间, 判断是否要获取新数据
        获取网路数据 并存储时间戳
    */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            // 获取本地数据
            this.fetchLocalData(url).then((wrapData) => {
                // 检查时间戳
                // console.log("222缓存中的数据", wrapData)
                if (wrapData && this.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    // 获取网络数据
                    this.fetchNetData(url).then(((data) => {
                        resolve(this._wrapData(data))
                    })).catch((error) => {
                        reject(error)
                    })
                }
            }).catch((error) => {
                // 获取网络数据
                this.fetchNetData(url).then(((data) => {

                    resolve(this._wrapData(data))
                })).catch((error) => {
                    reject(error)
                })
            })
        })
    }

    //  保存到本地数据
    saveLocalData(url, data) {
        if (!data || !url) return
        const value = this._wrapData(data)
        // console.log("444要保存到缓存的数据", value)
        setStorage(url, value)
    }
    _wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime(),
        }
    }
    // 获取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            getStorage(url).then((value) => {
                // console.log("111获取缓存的数据--->", value)
                resolve(value)
            })
        })
    }

    // 获取网络数据 并保存到本地
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response was not work.')
                })
                .then(responseJson => {
                    this.saveLocalData(url, responseJson) // 将数据保存到本地
                    resolve(responseJson)
                }).catch(e => {
                    console.log('error info :', e)
                    reject(e)
                })
        })
    }

    // 检查时间戳 时间有效期是4小时
    checkTimestampValid(timestamp = 0) {
        const currentDate = new Date()
        const targetDate = new Date(parseInt(timestamp))  // 时间戳要转化成
        // console.log("33当前时间", currentDate, currentDate.getHours())
        // console.log("33时间检查", targetDate, targetDate.getHours())

        if (currentDate.getMonth() !== targetDate.getMonth()) return false
        if (currentDate.getDate() !== targetDate.getDate()) return false
        if (currentDate.getHours() - targetDate.getHours() >= 4) return false
        return true
    }
}