
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native'

const deviceWidth = Dimensions.get('window').width

export default class CustomTabBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDefaultColor: '#08086b',
            inactiveDefaultColor: '#666666',
            activeTab: props.activeTab,
            laoutTextList:[],
            leftPosition: 15, // 文本距左边的距离
        }
        this.laoutList = [] //按钮数据容器
        this.scrollW = 0 // 按钮总长度初始值
        // this.laoutTextList = [] // 文本数据容器
    }


    UNSAFE_componentWillReceiveProps(props) { // React16 新特性 
        const { activeTab } = this.state
        // console.log("activeTab",activeTab,props.activeTab)
        if (activeTab !== props.activeTab) { // 仅更新一次
            this.setState({ activeTab: props.activeTab })
            this.setIndex(props.activeTab, false);
        }
    }

    _renderUnderline() {
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            bottom: 5,
            height: 2,
            backgroundColor: this.props.activeColor,
            width: 0.9,
            left: 0,
        };
        const {laoutTextList,leftPosition} = this.state

        const scaleValue = () => {
            let arr = new Array(numberOfTabs);
            return arr.fill(0).reduce( (pre, cur, idx) => {
                pre.inputRange.push(idx)
                laoutTextList.length ===  numberOfTabs ? pre.outputRange.push(laoutTextList[idx].width) : pre.outputRange.push(10)
                return pre
            }, { inputRange: [], outputRange: [] })
        }
        const scaleX = this.props.scrollValue.interpolate(scaleValue());

        const translateXValue = () => {
            let arr = new Array(numberOfTabs);
            // console.log("arr", arr.fill(0), defaultScale)
            return arr.fill(0).reduce( (pre, cur, idx) => {
                pre.inputRange.push(idx)
                //  需要等tab数据渲染 结束才可添加 *** 应该可优化 暂没想到怎么写
                laoutTextList.length ===  numberOfTabs && this.laoutList.length === numberOfTabs ? pre.outputRange.push(this.laoutList[idx].x + (laoutTextList[idx].width + leftPosition )/2) : pre.outputRange.push(idx*10)
                // if (laoutTextList.length ===  numberOfTabs && this.laoutList.length === numberOfTabs) {
                //     // console.log("laoutList[idx]  w宽度 ww",idx,this.laoutList[idx].width,'---',laoutTextList[idx].width)
                //     console.log("laoutList[idx]  x坐标 xx",idx,this.laoutList[idx].x,'---',laoutTextList[idx].x)
                // }
                return pre
            }, { inputRange: [], outputRange: [] })
        }
        const translateX = this.props.scrollValue.interpolate(translateXValue());
        // console.log("translateXValue",translateXValue())
        return (
            <Animated.View
                style={[
                    tabUnderlineStyle,
                    {
                        transform: [
                            { translateX},
                            { scaleX}
                        ],
                    },
                    this.props.underlineStyle,
                ]}
            />
        )
    }

    _renderTab(name, page, isTabActive, onPressHandler) {
        const {leftPosition} = this.state
        const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';
        const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;

        return (<Button
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => {
                this.setIndex(page)
                onPressHandler(page)
            }}
            onLayout={e => this.setLaout(e.nativeEvent.layout, page)}
        >
            <View style={[styles.tab]}>
                <Text
                    onLayout={e => this.setTextLaout(e.nativeEvent.layout, page)}
                    style={[{ color: textColor, fontWeight,paddingLeft:leftPosition }]}>{name}</Text>
            </View>
        </Button>);
    }

    setIndex(index, bl = true) {
        //先改变点击项的颜色
        this.setState({ activeTab: index })
        // console.log("index",index)
        //兼容错误
        if (!this.scroll) return;
        //拿到当前项的位置数据
        let layout = this.laoutList[index];
        let rx = deviceWidth / 2;
        //公式
        let sx = layout.x - rx + layout.width / 2; // ** 需要滑动的距离
        //如果还不需要移动,原地待着
        if (sx < 0) sx = 0;
        //移动位置
        sx < this.scrollW - deviceWidth && this.scroll.scrollTo({ x: sx, animated: bl });
        //结尾部分直接移动到底
        sx >= this.scrollW - deviceWidth && this.scroll.scrollToEnd({ animated: bl });
        // console.log("sx --",sx,"layout -- ",layout,"deviceWidth--",deviceWidth,'---',this.scrollW)
    }


    setLaout(layout, index) {
        // console.log("每个tab的宽度 -- ",layout,index)
        //存单个项的位置
        this.laoutList[index] = layout;
        //计算所有项的总长度
        this.scrollW += layout.width;
    }

    setTextLaout(layout, index) {
        //存单个项的位置
        const {laoutTextList} = this.state
        laoutTextList[index] = layout
        // console.log("layout--",layout)
        this.setState({
            laoutTextList
        })
    }

    render() {
        // console.log("this,props",this.props)
        const { backgroundColor = '#fff' } = this.props
        return (
            <View style={[styles.tabHeight, { backgroundColor: backgroundColor }]}>
                <ScrollView
                    ref={e => this.scroll = e}
                    horizontal  // 水平滚动
                    directionalLockEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    style={[styles.tabHeight, styles.tabs, { backgroundColor: backgroundColor }]}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        return this._renderTab(name, page, isTabActive, this.props.goToPage)
                    })}
                    {this._renderUnderline()}
                </ScrollView>
            </View>

        );
    };
}



const ButtonAndroid = (props) => (
    <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()}
        {...props}
    >
        {props.children}
    </TouchableNativeFeedback>);

const ButtonIos = (props) => (<TouchableOpacity {...props}>
    {props.children}
</TouchableOpacity>);


const styles = StyleSheet.create({
    tab: {
        // paddingLeft: 10,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    tabHeight: {
        height: 46,
    }
});
