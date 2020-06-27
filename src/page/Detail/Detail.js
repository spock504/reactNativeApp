import React from 'react'
import { View, Text, BackHandler,TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

import { setStorage, getStorage, deleteStorage } from '../../util/storage'

const STORAGE_KEY = 'detail_key'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storageValue: '',
        }
    }
    componentDidMount() {
        let lastTime = null;
        const DELAY_INTERVAL = 1000;
        let count = 0
        function _updateCountDownTimer(timestamp) {
          lastTime = lastTime || timestamp;
          const tickInterval = timestamp - lastTime;// 时间间隔差
          if (tickInterval >= DELAY_INTERVAL) {
            count ++
            console.log("来了 这里操作")
            lastTime = timestamp + (tickInterval - DELAY_INTERVAL); // 执行时间
          }
          if(count > 3) {
            console.log("lai 暂停",count)
            cancelAnimationFrame(this.timer)
            return
          }
          this.timer = requestAnimationFrame(_updateCountDownTimer.bind(this));
        }
        if (!this.timer) {
            this.timer = requestAnimationFrame(_updateCountDownTimer.bind(this));
        }
        // this.loadData() // 请求

        // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }


    loadData() {
        let url = 'https://api.github.com/search/repositories?q=java'
        fetch(url)
            .then(response => {
                console.log("response.ok", response.ok)
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Network response was not work.')
            })
            .then(responseJson => {
                console.log("responseJson--", responseJson.total_count)
            }).catch(e => {
                console.log('error info :', e)
            })
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timer)
        // BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    setItemStorage() {
        setStorage(STORAGE_KEY, '23333', () => {
            console.log("设置缓存成功")
        })
    }

    getItemStorage() {
        getStorage(STORAGE_KEY).then((value) => {
            console.log("获取缓存成功",value)
            this.setState({
                storageValue: value
            })
        })
    }

    deleteItemStorage() {
        deleteStorage(STORAGE_KEY).then(() => {
            console.log("删除缓存成功")
            this.setState({
                storageValue: ''
            })
        })
      
    }

    changeText () {
        console.log("来看下",this.textRef.setNativeProps)
        this.textRef.setNativeProps({text:parseInt(Math.random()*(20-10+1))+10 + ''})
    }

    render() {
        const { storageValue } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
                <Text>DetailPage Screen</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                    <TextInput ref={(ref) =>  this.textRef = ref} editable={false} defaultValue="2333" />
                    <Text onPress={() => this.changeText()}>点击修改</Text>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text onPress={() => this.setItemStorage()}>存储</Text>
                    <Text onPress={() => this.getItemStorage()}>获取</Text>
                    <Text onPress={() => this.deleteItemStorage()}>删除</Text>
                </View>
                {storageValue ? <Text>{storageValue}</Text> : null}
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
