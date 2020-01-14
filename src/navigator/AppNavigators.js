import React from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import posed from 'react-native-pose' // react-native 动画库


import WelcomePage from '../page/Welcome/WelcomePage'
import HomePage from '../page/Home/HomePage'
import TrendingPage from '../page/Home/TrendingPage'
import FavoritePage from '../page/Home/FavoritePage'
import MyPage from '../page/Home/MyPage'

const Scaler = posed.View({ // 定义点击缩放
    active: { scale: 1 },
    inactive: { scale: 0.9 }
})
const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 53,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#EEEEEE',
        // shadowOffset: { width: 5, height: 10 },
        // shadowOpacity: 0.75,
        // elevation: 1
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scaler: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scalerOnline: {
        flex: 1,
        alignItems: 'center',
        marginTop: -20,
    },
    iconText: {
        fontSize: 12,
        lineHeight: 20
    }
})


const SwitchNavigatorConfig = {
    initialRouteName: 'HomePage',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#41affc',
    },
    style:{
        borderTopColor: '#fff',
    },
    tabBarComponent: (props) => {
        const {
            renderIcon,
            getLabelText,
            activeTintColor,
            inactiveTintColor,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation
        } = props

        const { routes, index: activeRouteIndex } = navigation.state
        // console.log("props----", props)
        console.log("routes----路由", routes)

        return (
            <Scaler style={Styles.container}>
                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
                    return (
                        <TouchableHighlight
                            key={routeIndex}
                            style={Styles.tabButton}
                            onPress={() => {
                                onTabPress({ route })
                            }}
                            onLongPress={() => {
                                onTabLongPress({ route })
                            }}
                            underlayColor="#fff"
                        >
                            {route.key == 'TrendingPage' ? ( // 对特殊图标进行特殊处理
                                <Scaler
                                    style={Styles.scalerOnline}
                                    pose={isRouteActive ? 'active' : 'inactive'}
                                >
                                    {renderIcon({ route, focused: isRouteActive, tintColor })}
                                </Scaler>
                            ) : ( // 普通图标普通处理
                                    <Scaler
                                        style={Styles.scaler}
                                        pose={isRouteActive ? 'active' : 'inactive'}
                                    >
                                        {renderIcon({ route, focused: isRouteActive, tintColor })}
                                        <Text style={Styles.iconText}>{getLabelText({ route })}</Text>
                                    </Scaler>
                                )}
                        </TouchableHighlight>
                    )
                })}
            </Scaler>
        )
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
                <Entypo
                    name={'blackboard'}
                    size={44}
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