import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Trending Screen</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    navigation.setParams({
                        theme:{
                            tintColor: 'red',
                            updateTime: new Date().getTime(),
                        }
                    })
                }}>
                    <Text>修改主题色</Text>
                </TouchableOpacity>
            </View>
        );
    }
}