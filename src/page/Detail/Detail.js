import React from 'react'
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
                <Text>DetailPage Screen</Text>
            </View>
        );
    }
}
const mapStateToProps = ({ nav }) => {
    return {
        nav
    }
}
export default connect(mapStateToProps)(DetailPage);
