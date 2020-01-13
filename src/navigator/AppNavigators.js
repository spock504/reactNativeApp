import React from 'react';
import { View, Text } from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import WelcomePage from '../page/Welcome/WelcomePage'
import HomePage from '../page/Home/HomePage'
import TrendingPage from '../page/Home/TrendingPage'
import FavoritePage from '../page/Home/FavoritePage'
import MyPage from '../page/Home/MyPage'

const SwitchNavigatorConfig = {
    initialRouteName: 'HomePage',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#41affc',
    }
}

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

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
                <MaterialIcons
                    name={'trending-up'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
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

//NOTE: 通过 createSwitchNavigator 一次只显示一个页面。作用： 将欢迎页和首页联系起来
const AppNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
})
export default createAppContainer(AppNavigator);