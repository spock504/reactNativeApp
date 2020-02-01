import { combineReducers } from 'redux'
import {
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

// import { AppNavigator } from '../navigator/AppNavigators'; // 缩放效果导航 && App.js 也需要更改
// import { AppNavigator } from '../navigator/LottieNavigators'; // 动画导航 && App.js 也需要更改
import { AppNavigator } from '../navigator/DynamicNavigators' // 动效导航 && App.js 也需要更改
import homeReducer from './home'
import themeReducer from './theme'

const navReducer = createNavigationReducer(AppNavigator); // 导航 包裹NavigationReducer
const appReducer = combineReducers({
    nav: navReducer,
    homeReducer,
    themeReducer,
});

export default appReducer