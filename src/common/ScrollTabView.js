import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types'

import TabIndicator from './TabIndicator'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

//集成TabIndicator和需要滚动的子视图
export default class ScrollTabView extends Component {
    //这里的属性基本就是TabIndicator的除了titles,这个是所有tab的名称,当然最后也是传给TabIndicator的
    static propTypes = {
        tabBarActiveTextColor: PropTypes.string,
        tabBarInactiveTextColor: PropTypes.string,
        titles: PropTypes.array,
        tabTextStyle: PropTypes.any,
        tabBarUnderlineStyle: PropTypes.any,
        tabHeight: PropTypes.number,
    };
    static defaultProps = {
        tabBarActiveTextColor: '#41affc',
        tabBarInactiveTextColor: '#6b6d6e',
        titles: [],
        tabHeight: 50,
    };
    render() {
        return (
            <View style={styles.container}>
                <TabIndicator
                    ref={(r) => this.tab = r}
                    tabNames={this.props.titles}
                    tabBarUnderlineStyle={this.props.tabBarUnderlineStyle}
                    tabHeight={this.props.tabHeight}
                    tabTextStyle={this.props.tabTextStyle}
                    tabBarActiveTextColor={this.props.tabBarActiveTextColor}
                    tabBarInactiveTextColor={this.props.tabBarInactiveTextColor}
                    onTabPress={(index) => {
                        console.log("点击 --- ",index)
                        this.sv.scrollTo({ x: index * screenWidth, y: 0, animated: true })
                    }}
                />
                <ScrollView
                    ref={(r) => this.sv = r}
                    pagingEnabled
                    horizontal
                    onScroll={(e) => {
                        this.tab.swipeToTrans(e.nativeEvent.contentOffset.x / screenWidth)
                    }}
                    style={{flex:1}} 
                >
                    {/* 要展示的滚动视图 */}
                    {this.props.children}
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
    }
})
