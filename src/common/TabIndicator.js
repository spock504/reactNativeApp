/* 
    实现顶部tab导航切换 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types'

const screenWidth = Dimensions.get('window').width;
const defaultVisiableCount = 5; //默认显示的tab数量

export default class TabIndicator extends Component {
    static propTypes = {
        tabBarActiveTextColor: PropTypes.string,//tab选中时显示的颜色
        tabBarInactiveTextColor: PropTypes.string,//tab未选中时的颜色
        tabNames: PropTypes.array,//tab名称集合
        tabTextStyle: PropTypes.any,//tab文本的样式
        tabBarUnderlineStyle: PropTypes.any,//tab下划线的样式
        tabHeight: PropTypes.number,//tab的高度
    };

    static defaultProps = {
        tabBarActiveTextColor: '#686868',
        tabBarInactiveTextColor: '#cccccc',
        tabNames: [],
        tabHeight: 50,
    }

    constructor(props) {
        super(props)
        this.state = {
            transAnimX: new Animated.Value(0), //指示器平移动画
        };
        this.tabManager = [];
        this.tabRef = [];
        this.tabWidth = 0;//单个tab的宽度
        this.currPosition = 0;//当前位置
        this.totalTabWidth = 0;//所有tab宽度之和
        if (this.props.tabNames) {
            //计算单个tab的宽度
            this.tabWidth = this.props.tabNames.length > defaultVisiableCount ?
                screenWidth / defaultVisiableCount :
                screenWidth / this.props.tabNames.length;
            this.totalTabWidth = this.tabWidth * this.props.tabNames.length;
            //创建所有tabView
            for (let index = 0; index < this.props.tabNames.length; index++) {
                this.tabManager.push(
                    <Tab ref={(r) => this.tabRef[index] = r}
                        key={index}
                        index={index}
                        title={this.props.tabNames[index]}
                        onTabPress={(index) => {
                            this.clickToTrans(index);
                        }}
                        tabWidth={this.tabWidth}
                        tabHeight={this.props.tabHeight}
                        style={{ ...this.props.tabTextStyle }}
                        selectedTextColor={this.props.tabBarActiveTextColor}
                        unselectedTextColor={this.props.tabBarInactiveTextColor}
                    />
                )
            }
        }
    }
    //点击tab时触发
    clickToTrans = (index) => {
        this.currPosition = index;
        if (this.props.onTabPress) {
            this.props.onTabPress(index);//通知外部点击的位置
        } else {
            this.swipeToTrans(index) //外部没有设置关联时自己处理
        }

    }
    //关联的ScrollView滚动时触发
    swipeToTrans = (index) => {
        this.currPosition = index;
        console.log("swipeToTrans:index=" + index)
        if (index >= (defaultVisiableCount - 1)) {
            this.scrollToNext()
        } else if (index >= 0) {
            console.log(index - (defaultVisiableCount - 1) > 0)
            this.scrollToPre()
        }
        //移动指示器
        this.state.transAnimX.setValue(index)
        //遍历所有tab,根据当前选中的index修改颜色
        this.tabRef.map((ref, key) => { ref.changeState(index) });

    }
    //滚动下一个tab
    scrollToNext = () => {
        console.log("scrollToNext")
        let x = (this.currPosition - (defaultVisiableCount - 1) + 1) * this.tabWidth
        this.sv.scrollTo({ x: x, y: 0, animated: true })
    }
    //滚动上一个tab
    scrollToPre = () => {
        console.log("scrollToPre")
        let x = - this.tabWidth
        this.sv.scrollTo({ x: x, y: 0, animated: true })
    }
    render() {

        return (
            <View style={{ height: this.props.tabHeight, width: screenWidth, backgroundColor: 'white' }}>
                <ScrollView
                    horizontal={true}
                    keyboardDismissMode='on-drag'
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    ref={(r) => this.sv = r}
                >
                    {/* 所有tab */}
                    {this.tabManager}

                    {/* 指示器 */}
                    <Animated.View style={[styles.tabLine, { width: this.tabWidth },
                    {
                        transform: [
                            {
                                translateX: this.state.transAnimX.interpolate({
                                    inputRange: [0, this.props.tabNames.length], //0~tab个数
                                    outputRange: [0, this.totalTabWidth] //0~所有tab的总宽度
                                })
                            }
                        ]

                    }
                    ]} />
                </ScrollView>

                {/* 默认线 */}
                {/* <View style={styles.line} /> */}
            </View>
        )


    }

}
/**
 * 单个tab
 */
class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0 //选中的下标
        }
    }
    render() {
        return (
            <TouchableHighlight
                underlayColor='white'
                onPress={() => {
                    this.props.onTabPress && this.props.onTabPress(this.props.index)
                }}
                style={[{ height: this.props.tabHeight, width: this.props.tabWidth }, styles.tabStyle]}>
                <Text style={{
                    textAlign: 'center',
                    color: this.state.selected === this.props.index ? this.props.selectedTextColor : this.props.unselectedTextColor,
                    ...this.props.style,
                }}>
                    {this.props.title}
                </Text>
            </TouchableHighlight>
        )
    }
    //修改选中的index
    changeState = (index) => {
        
        this.setState({
            selected: index
        })
    }

}
const styles = StyleSheet.create({
    line: {
        backgroundColor: '#cccccc',
        width: screenWidth,
        height: 1
    },
    tabLine: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        backgroundColor: '#41affc',
    },
    tabStyle: {
        justifyContent: 'center',
        alignContent: 'center'
    }
})