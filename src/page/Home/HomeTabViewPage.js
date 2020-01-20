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
    tabBarUnderlineStyle={Styles.underline}
    // initialPage={0} // 指定默认tab
    renderTabBar={() => <CustomTabBar
      tabUnderlineScaleX={3}
      activeColor={"#0af"}
      inactiveColor={"#333"}
      backgroundColor={'#f4f4f4'}
      tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
    />}
  >
    <Text tabLabel='Tab 热门'>My</Text>
    <Text tabLabel='Tab 推荐'>favorite</Text>
    <Text tabLabel='Tab 关注'>project</Text>
    {/*<Text tabLabel='Tab #4 word'>favorite</Text>*/}
    {/*<Text tabLabel='Tab #5'>project</Text>*/}
  </ScrollableTabView>;
}
