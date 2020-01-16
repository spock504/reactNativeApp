/* 
    通过原生的createMaterialTopTabNavigator 设置导航的样式 
    => 实现底部选项卡样式
    缺点: 
    1. 没找到一个合适的方式实现跟 tab、底部指示器 样式的宽度的自适应
    2. 无法实现顶部的导航数量的变化
*/
import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


import PopularTab from '../Detail/Popular'
import DetailTab from '../Detail/Detail'

const Styles = StyleSheet.create({
    container: {
        height: 42,
        backgroundColor: '#fff',
    },
    tabStyle: {
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorStyle: {
        // opacity:0, // 可以设置该样式取消底部选项横线
        height: 3,
        backgroundColor: '#41affc',
        borderRadius: 10,
        width: 60,
        marginLeft: 15,
    },
})

const TabNavigator = createMaterialTopTabNavigator({
    PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
            title: '来啊'
        }
    },
    PopularTab2: {
        screen: DetailTab,
        navigationOptions: {
            title: '导航啊'
        }
    },
    PopularTab3: {
        screen: DetailTab,
        navigationOptions: {
            title: 'DetailTab'
        }
    },
    PopularTab4: {
        screen: DetailTab,
        navigationOptions: {
            title: 'Detail'
        }
    },
    PopularTab5: {
        screen: DetailTab,
        navigationOptions: {
            title: 'DetailTab'
        }
    },
    PopularTab6: {
        screen: DetailTab,
        navigationOptions: {
            title: 'Tab'
        }
    },
}, {
    tabBarOptions: {
        style: Styles.container,
        tabStyle: Styles.tabStyle,
        indicatorStyle: Styles.indicatorStyle, // 底部横线样式
        upperCaseLabel: false, // 取消文本大写
        scrollEnabled: true, // 当选校卡较长是是否可以滚动
        activeTintColor: '#41affc',
        inactiveTintColor: '#6b6d6e',
    },
})

export default TabNavigator