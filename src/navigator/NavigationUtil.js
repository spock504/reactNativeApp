/* 
    全局导航 跳转工具类
*/

export default class NavigationUtil {
    //  返回上一页
    static backToPage (navigation) {
        navigation.goBack()
    }
    //  重置回首页
    static resetToHomePage (params) {
        const {navigation} = params
        navigation.navigate('Main')
    }
}