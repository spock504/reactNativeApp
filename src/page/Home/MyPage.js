import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { onChangeTheme } from '../../actions/theme'

class MyScreen extends React.Component {
    render() {
        const {navigation,onChangeTheme} = this.props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>My Screen</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                   onChangeTheme('blue')
                }}>
                    <Text>修改主题色</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ({ themeReducer }) => {
    return {
        themeReducer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTheme: (theme) => dispatch(onChangeTheme({ payload: theme }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyScreen);