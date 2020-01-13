import React from 'react'
import { View, Text } from 'react-native';

import NavigationUtil from '../../navigator/NavigationUtil'

//  欢迎页面
export default class WelcomePage extends React.Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 2000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>WelcomePage Screen</Text>
            </View>
        );
    }
}