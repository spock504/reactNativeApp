import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

import ScrollableTabView , { DefaultTabBar } from 'react-native-scrollable-tab-view'

import CustomTabBarFit from '../../common/CustomTabBarFit' // 自适应tab 可设置下划线长度

export default class App extends Component {

  
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => (<CustomTabBarFit
        backgroundColor={'#f4f4f4'}
        tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
        tabUnderlineScaleX={3} // default 3
        activeColor={"#0af"}
        inactiveColor={"#333"}
        />)}>

        <Text tabLabel='Tab1'>Tab1</Text>
        <Text tabLabel='Tab2'>Tab2</Text>
        <Text tabLabel='Tab3'>Tab3</Text>
        <Text tabLabel='Tab4'>Tab4</Text>
      </ScrollableTabView>
    )
  }
}