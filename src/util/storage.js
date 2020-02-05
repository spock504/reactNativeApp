import AsyncStorage from '@react-native-community/async-storage';

export async function setStorage(key, value, callback = null) {
    try {
        // console.log("缓存的类型",typeof value,stringify(value))
        if (typeof value === 'object') value = JSON.stringify(value) // 对象存储时需要转化为字符串
        if (typeof value === 'number') value = value + '' // 数字转化成字符串
        await AsyncStorage.setItem(key, value, callback)
    } catch (error) {
        console.log('storage setItem error : ', error)
    }
}

export async function getStorage(key) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value && value.indexOf('=') !== -1) { // 当是对象时存储含有等号
            return JSON.parse(value)
        } else {
            return value
        }
    } catch (error) {
        console.log('storage getItem error', error)
    }
}

export async function deleteStorage(key, callback = null) {
    try {
        await AsyncStorage.removeItem(key, callback)
    } catch (error) {
        console.log('storage removeItem error', error)
    }
}