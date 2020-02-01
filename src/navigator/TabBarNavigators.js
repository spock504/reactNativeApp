import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import posed from 'react-native-pose' // react-native 动画库
import { connect } from 'react-redux';

import NavigationUtil from './NavigationUtil' // 路由操作

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

class TabBarComponent extends Component {
    constructor(props) {
        super(props)
        // this.theme = {
        //     tintColor: '#41affc',  // 选中的自定义的默认颜色
        //     updateTime: new Date().getTime(),
        // }
        this.state = {
            activeColor: '#41affc',  // 选中的自定义的默认颜色
            tabArray: ['HomePage', 'TrendingPage', 'MyPage'], // 可用来动态配置动态底部tab，需要和路由名字一一对应
        }
    }

    render() {
        const {
            renderIcon,
            getLabelText,
            activeTintColor,
            inactiveTintColor,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation,
            themeReducer = {},
        } = this.props

        const { routes, index: activeRouteIndex } = navigation.state
        // if (routes[activeRouteIndex].params) { // 从路由中获取需要设置的动态颜色
        //     const { theme } = routes[activeRouteIndex].params
        //     if (theme && theme.updateTime > this.theme.updateTime) { // 时间的比较：取最后一次修改的颜色值
        //         this.theme = theme
        //     }
        // }
        // const { tintColor } = this.theme
        const { tabArray = [], activeColor } = this.state
        const { theme } = themeReducer
        const tintColor = theme ? theme : activeColor
        // console.log("routes----路由", routes)
        NavigationUtil.navigation = navigation //** 路由工具类中添加路由函数

        let aynamicRoutes = [] // 用于动态配置底部tab个数
        tabArray.forEach((value, index) => {
            routes.forEach((item, itemIndex) => {
                if (item.key === value) {
                    aynamicRoutes.push(item)
                }
            })
        })
        // console.log("aynamicRoutes ---",aynamicRoutes)
        return (
            <Scaler style={Styles.container}>
                {aynamicRoutes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex
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
                                        <Text style={[Styles.iconText, { color: isRouteActive ? tintColor : inactiveTintColor }]}>{getLabelText({ route })}</Text>
                                    </Scaler>
                                )}
                        </TouchableHighlight>
                    )
                })}
            </Scaler>
        )
    }
}
const mapStateToProps = ({ themeReducer }) => {
    return {
        themeReducer,
    }
}

const TabBarComponentState = connect(mapStateToProps)(TabBarComponent);

export default TabBarComponentState