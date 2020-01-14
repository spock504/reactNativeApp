import React, { useState, useEffect } from 'react';
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
import LottieView from 'lottie-react-native';


import WelcomePage from '../page/Welcome/WelcomePage'
import HomePage from '../page/Home/HomePage'
import TrendingPage from '../page/Home/TrendingPage'
import MyPage from '../page/Home/MyPage'

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 62,
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
        marginTop: -40,
    },
    iconText: {
        fontSize: 12,
        lineHeight: 14
    }
})


const SwitchNavigatorConfig = {
    initialRouteName: 'HomePage',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#41affc',
    },
    style: {
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
        const onPressTab = (index) => {
            switch (index) {
                case 0:
                    this.animationHot.play(0, 1000)
                    this.animationTrending.reset()
                    this.animationPeople.reset()
                    break;
                case 1:
                    this.animationTrending.play(0,1000)
                    this.animationHot.reset()
                    this.animationPeople.reset()
                    break;
                case 2:
                    this.animationPeople.play(0, 1000)
                    this.animationHot.reset()
                    this.animationTrending.reset()
                    break;
            }
        }
        // console.log("props----", props)
        // console.log("routes----路由", routes)

        return (
            <View style={Styles.container}>
                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
                    return (
                        <TouchableHighlight
                            key={routeIndex}
                            style={Styles.tabButton}
                            onPress={() => {
                                onTabPress({ route })
                                onPressTab(routeIndex)
                            }}
                            onLongPress={() => {
                                onTabLongPress({ route })
                            }}
                            underlayColor="#fff"
                        >
                            {route.key == 'TrendingPage' ? ( // 对特殊图标进行特殊处理
                                <View
                                    style={Styles.scalerOnline}
                                >
                                    <LottieView
                                        ref={animation => {
                                            this.animationTrending = animation;
                                        }}
                                        speed={2}
                                        loop={false}
                                        style={{ width: 69, height: 69 }}
                                        source={require('../animation/trending.json')} />
                                </View>
                            ) : ( // 普通图标普通处理
                                    <View
                                        style={Styles.scaler}
                                    >
                                        {
                                            route.key === 'HomePage' ?
                                                <LottieView
                                                    ref={animation => {
                                                        this.animationHot = animation;
                                                    }}
                                                    speed={2}
                                                    loop={false}
                                                    style={{ width: 44, height: 44 }}
                                                    source={require('../animation/hot.json')} /> :
                                                <LottieView
                                                    ref={animation => {
                                                        this.animationPeople = animation;
                                                    }}
                                                    speed={2}
                                                    loop={false}
                                                    style={{ width: 44, height: 44 }}
                                                    source={require('../animation/people.json')} />
                                        }
                                        <Text style={[Styles.iconText, { color: tintColor }]}>{getLabelText({ route })}</Text>
                                    </View>
                                )}
                        </TouchableHighlight>
                    )
                })}
            </View>
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
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
        }
    },
}, SwitchNavigatorConfig);

//NOTE: 通过 createSwitchNavigator 一次只显示一个页面。作用： 将欢迎页和首页联系起来
const AppNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
})
export default createAppContainer(AppNavigator);