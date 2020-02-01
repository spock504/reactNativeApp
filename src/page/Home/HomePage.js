/* 
    通过原生的createMaterialTopTabNavigator 设置导航的样式 
    => 实现底部选项卡样式
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
        width: 60, // 设置固定宽度的下划线, 有个问题 ：tab标题需要写死
        marginLeft: 15,
    },
    labelStyle: {
        fontSize: 14,
    }
})

const setTabs = () => {
    const tabs = {}
    const tabNames = ['Java','Android','IOS','React']
    tabNames.forEach((value,index) => {
        tabs[`tab${index}`] = {
            screen: (props) =><DetailTab {...props} tabLabel={value} />, // 往页面中传递参数
            navigationOptions: {
                title: value
            }
        }
    })
    return tabs
}

const TabNavigator = createMaterialTopTabNavigator(
    setTabs(), {
    tabBarOptions: {
        style: Styles.container,
        tabStyle: Styles.tabStyle,
        indicatorStyle: Styles.indicatorStyle, // 底部横线样式
        labelStyle:Styles.labelStyle, // 文本样式
        upperCaseLabel: false, // 取消文本大写
        scrollEnabled: true, // 当选项卡较长是是否可以滚动
        activeTintColor: '#41affc',
        inactiveTintColor: '#6b6d6e',
    },
})

export default TabNavigator