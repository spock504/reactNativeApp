import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import CustomTabBar from '../../common/CustomTabBar'

const Styles = StyleSheet.create({
  underline: {
    height: 2,
    backgroundColor: '#41affc',
  }
})

export default () => {
  return <ScrollableTabView
    // style={{ marginTop: 20 }}
    // tabBarActiveTextColor="#41affc"
    tabBarUnderlineStyle={Styles.underline}
    // initialPage={0}
    renderTabBar={() => <CustomTabBar
      tabUnderlineScaleX={3}
      activeColor={"#41affc"}
      inactiveColor={"#333"}
      backgroundColor={'#fff'} // 背景色
      tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
    />}
  >
    <Text tabLabel='Tab 热门'>热门</Text>
    <Text tabLabel='Tab 中测试'>Tab</Text>
    <Text tabLabel='Tab 关注'>关注</Text>
    <Text tabLabel='Tab #4 word'>word</Text>
    <Text tabLabel='Tab #5'>project</Text>
    {/* <Text tabLabel='Tab #6'>project</Text> */}
    {/* <Text tabLabel='Tab #7'>project</Text> */}
  </ScrollableTabView>;
}
