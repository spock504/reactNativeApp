/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'

// import { AppWithNavigationState } from './navigator/AppNavigators'; //  moren&& reducer/index.js 也需要更改
// import { AppWithNavigationState } from './navigator/LottieNavigators'; // 动画导航 && reducer/index.js 也需要更改
import { AppWithNavigationState } from './navigator/DynamicNavigators'; //缩放效果导航 && reducer/index.js 也需要更改
import store from './store/index'

class AppContainer extends Component {
  render() {
    // store
 

    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default AppContainer