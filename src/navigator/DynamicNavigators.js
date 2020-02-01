import React, { Component } from 'react'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {
    createReduxContainer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import TabBarComponent from './TabBarNavigators'
// import HomePage from '../page/Home/HomePage' // 原生方法创建
// import HomePage from '../page/Home/HomeTabPage' // scrollView实现
import HomePage from '../page/Home/HomeTabViewPage' // 插件实现 可滚动tab
// import HomePage from '../page/Home/HomeTabFitPage' // 插件实现 自适应&&不可滚动
import WelcomePage from '../page/Welcome/WelcomePage'
import TrendingPage from '../page/Home/TrendingPage'
import DetailPage from '../page/Detail/Detail'
import MyPage from '../page/Home/MyPage'

const SwitchNavigatorConfig = {
    initialRouteName: 'HomePage',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#41affc', // 动态定义颜色的话 并不从这个位置取颜色了
    },
    style: {
        borderTopColor: '#fff',
    },
    tabBarComponent: (props) => (
        <TabBarComponent {...props} />
    )
}

const MainNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name={'blackboard'}
                    size={44}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={'ios-people'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
}, SwitchNavigatorConfig);

//  配置底部Tab的头部导航栏样式
MainNavigator.navigationOptions = ({ navigation }) => {
    return {
        header: null,
    }
}

//  配置app头部导航栏样式
const TotalNavigator = createStackNavigator({
    Main: MainNavigator,
    DetailPage: DetailPage,
}, {
    defaultNavigationOptions: {
        // header: null
    }
})

//  欢迎页 路由
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

//NOTE: 通过 createSwitchNavigator 一次只显示一个页面。作用： 将欢迎页和首页联系起来
const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Total: TotalNavigator,
})

const AppNavigator = createAppContainer(RootNavigator);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export {
    AppNavigator,
    AppWithNavigationState,
}