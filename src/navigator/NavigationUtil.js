/* 
    全局导航 跳转工具类
*/

export default class NavigationUtil {
    // 跳转路由
    static goToPage (url, params) {
        const navigation = NavigationUtil.navigation
        if (!navigation) {
            console.log("navigation cant not be null")
            return
        }
        // console.log("navigation --- ",url,params)
        navigation.navigate(url,params)
    }
    
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