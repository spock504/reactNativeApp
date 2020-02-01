import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

import NavigationUtil from '../../navigator/NavigationUtil'

export default class DetailPage extends React.Component {
    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }
    render() {
        // console.log("navigation",this.props.navigation)
        console.log("NavigationUtil",NavigationUtil.goToPage)
        return (
            <View style={{ flex: 1,backgroundColor:'#f5f4f9' }}>
                <Text>Popular Screen</Text>
                <Text onPress={()=> NavigationUtil.goToPage('DetailPage2222')}>跳转外层tab</Text>
                <LottieView
                    style={{width: 300,height:300}}
                    ref={animation => {
                        this.animation = animation;
                    }}
                    loop={false} // 取消循环播放
                    source={require('../../animation/monster.json')} />
            </View>
        );
    }
}