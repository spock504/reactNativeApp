/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/navigator/AppNavigators'; // 缩放效果导航
// import App from './src/navigator/LottieNavigators'; // 动画导航
import App from './src/navigator/DynamicNavigators'; //动态导航 
import {name as appName} from './app.json';
import 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => App);
