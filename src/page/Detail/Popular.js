import React from 'react'
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default class DetailPage extends React.Component {
    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Popular Screen</Text>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../../animation/monster.json')} />
            </View>
        );
    }
}