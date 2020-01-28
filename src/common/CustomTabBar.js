
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
            activeTab:props.activeTab,
        }
        this.laout_list = [] //
        this.scrollW = 0 
    }


    UNSAFE_componentWillReceiveProps(props) { // React16 新特性 
        const {activeTab} = this.state
        // console.log("activeTab",activeTab,props.activeTab)
        if (activeTab !== props.activeTab) { // 仅更新一次
            this.setState({activeTab:props.activeTab})
            this.setIndex(props.activeTab, false);
        }
    }

    _renderUnderline() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        // const underlineWidth = this.props.tabUnderlineDefaultWidth ? this.props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2);
        // const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;
        // const deLen = (containerWidth / numberOfTabs - underlineWidth ) / 2;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: '100%',
            height: 2,
            borderRadius: 2,
            backgroundColor: this.props.activeColor,
            bottom: 5,
            left: 20
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2, 2.5],
            outputRange: [0, 30, 0, 30, 0, 30],
        });
        // console.log("this.props.translateX--- ",translateX)
        // console.log("numberOfTabs --- ",numberOfTabs)

        const scaleValue = (defaultScale) => {
            let arr = new Array(numberOfTabs * 2);
            // console.log("arr", arr.fill(0), defaultScale)
            return arr.fill(0).reduce(function (pre, cur, idx) {
                idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
                idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
                return pre
            }, { inputRange: [], outputRange: [] })
        }

        const scaleX = this.props.scrollValue.interpolate(scaleValue(1));
        // console.log("scaleX", scaleX)

        return (
            <Animated.View
                style={[
                    tabUnderlineStyle,
                    {
                        transform: [
                            // { translateX },
                            { scaleX }
                        ],

                    },
                    this.props.underlineStyle,
                ]}
            />
        )
    }

    _renderTab(name, page, isTabActive, onPressHandler) {
        const { textStyle } = this.props;
        const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor;

        const fontWeight = isTabActive ? 'bold' : 'normal';

        const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;

        return (<Button
            // style={{flex: 1}}
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
            <View style={styles.tab}>
                <Text style={[{ color: textColor, fontWeight }]}>
                    {name}
                </Text>
                {
                    isTabActive ? this._renderUnderline() : null
                }
            </View>
        </Button>);
    }

    setIndex(index, bl = true) {
        //先改变点击项的颜色
        // this.setState({ index })
        //兼容错误
        if (!this.scroll) return;
        //拿到当前项的位置数据
        let layout = this.laout_list[index];
        let rx = deviceWidth / 2;
        //公式
        let sx = layout.x - rx + layout.width / 2;
        //如果还不需要移动,原地待着
        if (sx < 0) sx = 0;
        //移动位置
        sx < this.scrollW - deviceWidth && this.scroll.scrollTo({ x: sx, animated: bl });
        //结尾部分直接移动到底
        sx >= this.scrollW - deviceWidth && this.scroll.scrollToEnd({ animated: bl });
        console.log("sx",sx,deviceWidth,'---',this.scrollW,this.props.scrollValue)
    }
    

    setLaout(layout, index) {
        // console.log("每个tab的宽度 -- ",layout,index)
        //存单个项的位置
        this.laout_list[index] = layout;
        //计算所有项的总长度
        this.scrollW += layout.width;
    }

    render() {
        // console.log("this,props",this.props)
        // this.setIndex(this.props.activeTab)
        return (
            <View style={{height: 50}}>
                <ScrollView
                    ref={e => this.scroll = e}
                    horizontal  // 水平滚动
                    directionalLockEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        return this._renderTab(name, page, isTabActive, this.props.goToPage)
                    })}
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
        // flex: 1,
        // paddingHorizontal:14,
        paddingLeft: 20,
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#f4f4f4',
    },
});
