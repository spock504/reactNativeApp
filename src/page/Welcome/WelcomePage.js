import React from 'react'
import { View, Text } from 'react-native';

import NavigationUtil from '../../navigator/NavigationUtil'

//  欢迎页面
export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 1, // 倒计时开始时间
        }
    }
    componentDidMount() {
        let {time} = this.state
        this.timer = setInterval(() => {
            if (time === 0) {
                clearInterval(this.timer)
                NavigationUtil.resetToHomePage({
                    navigation: this.props.navigation
                })
            } else {
                time --
                this.setState({
                    time,
                })
            }
        }, 1000)
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    render() {
        const {time} = this.state
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>WelcomePage Screen</Text>
                <Text style={{position:'absolute', top: 40, right: 10}}>{time}</Text>
            </View>
        );
    }
}