import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';

import NavigationUtil from '../../navigator/NavigationUtil';
import CustomTabBar from '../../common/CustomTabBar';
import {actionTest} from '../../actions/home';
import AsyncStorage from '@react-native-community/async-storage';
import PopModal from '../../common/PopModal';

// const Styles = StyleSheet.create({
//   underline: {
//     height: 2,
//     backgroundColor: '#41affc',
//   }
// })

class HomeTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopModal: false,
      popData: [{name: '今天'}, {name: '这周'}, {name: '这个月'}],
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actionTest({payload: '测试一下'}));
    // AsyncStorage.clear()
    // throw new Error("My first Sentry error!");
  }

  onPopModal(bool) {
    this.setState({
      isPopModal: bool,
    });
  }

  render() {
    // console.log("this --home", this.props.homeReducer)
    const {popData} = this.state;
    return (
      <>
        <ScrollableTabView
          // style={{ marginTop: 20 }}
          // tabBarUnderlineStyle={Styles.underline} // 下划线样式
          // initialPage={0} // 设置默认显示的tab项
          renderTabBar={() => (
            <CustomTabBar
              activeColor={'#41affc'} // 文本选中颜色
              inactiveColor={'#333'} // 文本未选中颜色
              backgroundColor={'#fff'} // 背景色
            />
          )}>
          <View tabLabel="Tab 热门">
            <Text>热门</Text>
            <Text onPress={() => NavigationUtil.goToPage('DetailPage')}>
              跳转详情页
            </Text>
            <Text onPress={() => NavigationUtil.goToPage('StorageDataPage')}>
              离线缓存框架
            </Text>
            <Text onPress={() => NavigationUtil.goToPage('CatchErrorPage')}>
              错误异常保护
            </Text>
            <Text onPress={() => this.onPopModal(true)}>pop弹窗</Text>

            <PopModal onClose={() => this.onPopModal(false)} data={popData} />
          </View>
          <Text tabLabel="Tab 中测试">Tab</Text>
          <Text tabLabel="Tab 关注">关注</Text>
          <Text tabLabel="Tab #4 word">word</Text>
          <Text tabLabel="Tab #5">project</Text>
        </ScrollableTabView>
      </>
    );
  }
}

const mapStateToProps = ({homeReducer}) => {
  return {
    homeReducer,
  };
};

export default connect(mapStateToProps)(HomeTabView);
