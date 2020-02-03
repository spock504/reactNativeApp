import AsyncStorage from '@react-native-community/async-storage';
import { stringify, parse } from 'qs';

export async function setStorage(key, value) {
    try {
        if (typeof value === 'object') value = stringify(value) // 对象存储时需要转化为字符串
        if (typeof value === 'number') value = value + '' // 数字转化成字符串
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log('storage setItem error : ', error)
    }
}

export async function getStorage(key) {
    try {
        const value = await AsyncStorage.getItem(key)
        console.log("value",value)
        if (value && value.indexOf('=') !== -1) { // 当是对象时存储含有等号
            return parse(value)
        } else {
            return value
        }
    } catch (error) {
        console.log('storage getItem error', error)
    }
}

export async function deleteStorage(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log('storage removeItem error', error)
    }
}